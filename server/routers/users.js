const express = require('express')
const User = require('../models/users')
const Book = require('../models/books')
const router = new express.Router()

//Create User
router.post('/users',async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

//Count total users
router.get('/users/count',async (req,res)=>{
    try{
        const count = await User.countDocuments();
        res.send({count})
    }catch(e){
        res.status(500).send(e)
    }
})


//List All Users
router.get('/users',async (req,res)=>{
    try{
        const match = {}
        if(req.query.name){
            const regex = new RegExp(req.query.name, 'i')
            match.name = {$regex: regex}
        }
        if(req.query.email){
            const regex = new RegExp(req.query.email, 'i')
            match.email = {$regex: regex}
        }
        if(req.query.age){
            match.age = req.query.age
        }
        const users = await User.find(match).limit(parseInt(req.query.limit)).skip(parseInt(req.query.skip))
        res.send(users)
    }catch(e){
        res.status(500).send(e)
    }
})

//List User by ID
router.get('/users/:id',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user)
            return res.status(404).send()
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

//List all the booksID withdrawn by the user
router.get('/:id/books',async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user)
            return res.status(404).send()
        res.send(user.books)
    }catch(e){
        res.status(500).send(e)
    }
})

//Delete user account
router.delete('/users/:id',async(req,res)=>{
    try{
        const user = await User.findByIdAndRemove(req.params.id,{useFindAndModify : false})
        if(!user)
            return res.status(404).send()
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

//Update user detailes
router.put('/users/:id',async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new : true,useFindAndModify : false})
        if(!user)
            return res.status(404).send()
        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

//Withdraw book from library
router.put('/:userId/books/withdraw/:bookId',async(req,res)=>{
    try{
        const book = await Book.findById(req.params.bookId)
        const user = await User.findById(req.params.userId)
        if(!book)
            return res.status(404).send({
                errmsg : "Book is not found"
            })
        if (!user)
            return res.status(404).send({
                errmsg : "User is not found"
            })
        if(book.assigned)
            return res.status(404).send({
                errmsg : "The book is already assigned"
            })
        let booksWithUser = user.books
        booksWithUser.push(req.params.bookId)
        const updatedUser = await User.findByIdAndUpdate(req.params.userId,{books : booksWithUser},{new : true,useFindAndModify : false})
        await Book.findByIdAndUpdate(req.params.bookId,{assigned : true},{useFindAndModify : false})
        res.send(updatedUser)
    }catch(e){
        res.status(400).send(e)
    }
})

//Deposit book 
router.put('/:userId/books/deposit/:bookId',async(req,res)=>{
    try{
        const book = await Book.findById(req.params.bookId)
        const user = await User.findById(req.params.userId)
        if(!book)
            return res.status(404).send()
        if (!user)
            return res.status(404).send()
        if (!book.assigned)
            return res.status(404).send({
                errmsg: "The book is already deposited in library"
            })
        const index = user.books.indexOf(req.params.bookId)  
        if(index<0)
            return res.status(404).send({
                errmsg: "The book is not with the current user"
            })
        let booksWithUser = user.books
        booksWithUser.splice(index,1)
        const updatedUser = await User.findByIdAndUpdate(req.params.userId,{books : booksWithUser},{new : true,useFindAndModify : false})
        await Book.findByIdAndUpdate(req.params.bookId,{assigned : false},{useFindAndModify : false})
        res.send(updatedUser)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router