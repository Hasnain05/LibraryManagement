const express = require('express')
const Book = require('../models/books')
const adminAuth = require('../middleware/adminauth')
const userAuth = require('../middleware/userauth')
const router = new express.Router()

//Create Book
router.post('/books',userAuth,async (req,res)=>{
    const book = new Book(req.body)
    try{
        await book.save()
        res.status(201).send(book)
    }catch(e){
        res.status(400).send(e)
    }
})

//List All Books
router.get('/books',async (req,res)=>{
    try{
        const match = {}
        if(req.query.title){
            const regex = new RegExp(req.query.title, 'i')
            match.title = {$regex: regex}
        }
        if(req.query.author){
            const regex = new RegExp(req.query.author, 'i')
            match.author = {$regex: regex}
        }
        if(req.query.genre){
            const regex = new RegExp(req.query.genre, 'i')
            match.genre = {$regex: regex}
        }
        if(req.query.assigned){
            match.assigned = req.query.assigned
        }
        if(req.query.user){
            match.user = req.query.user
        }
        const books = await Book.find(match).limit(parseInt(req.query.limit)).skip(parseInt(req.query.skip))
        res.send(books)
    }catch(e){
        res.status(500).send(e)
    }
})

//Common Search Books
router.get('/search/books',async (req,res)=>{
    try{
        const innerMatch = []
        const match = {}
        if(req.query.search){
            const regex = new RegExp(req.query.search, 'i')
            innerMatch.push({
                title : {$regex: regex}
            }) 
            innerMatch.push({
                author : {$regex: regex}
            }) 
            innerMatch.push({
                genre : {$regex: regex}
            }) 
            match['$or'] = innerMatch; 
        }
        if(req.query.assigned){
            match.assigned = req.query.assigned
        }
        if(req.query.user){
            match.user = req.query.user
        }
        const books = await Book.find(match).limit(parseInt(req.query.limit)).skip(parseInt(req.query.skip))
        res.send(books)
    }catch(e){
        res.status(500).send(e)
    }
})

//Count Common Search Books
router.get('/search/books/count',async (req,res)=>{
    try{
        const innerMatch = []
        const match = {}
        if(req.query.search){
            const regex = new RegExp(req.query.search, 'i')
            innerMatch.push({
                title : {$regex: regex}
            }) 
            innerMatch.push({
                author : {$regex: regex}
            }) 
            innerMatch.push({
                genre : {$regex: regex}
            }) 
            match['$or'] = innerMatch; 
        }
        if(req.query.assigned){
            match.assigned = req.query.assigned
        }
        if(req.query.user){
            match.user = req.query.user
        }
        const count = await Book.countDocuments(match);
        res.send({count})
    }catch(e){
        res.status(500).send(e)
    }
})

//Count total books
router.get('/books/count',async (req,res)=>{
    try{
        const match = {}
        if(req.query.title){
            const regex = new RegExp(req.query.title, 'i')
            match.title = {$regex: regex}
        }
        if(req.query.author){
            const regex = new RegExp(req.query.author, 'i')
            match.author = {$regex: regex}
        }
        if(req.query.genre){
            const regex = new RegExp(req.query.genre, 'i')
            match.genre = {$regex: regex}
        }
        if(req.query.assigned){
            match.assigned = req.query.assigned
        }
        if(req.query.user){
            match.user = req.query.user
        }
        const count = await Book.countDocuments(match);
        res.send({count})
    }catch(e){
        res.status(500).send(e)
    }
})

//List Book by ID
router.get('/books/:id',async (req,res)=>{
    try{
        const book = await Book.findById(req.params.id)
        if(!book)
            return res.status(404).send()
        res.send(book)
    }catch(e){
        res.status(500).send(e)
    }
})

//Remove book from library
router.delete('/books/:id',adminAuth,async(req,res)=>{
    try{
        const book = await Book.findById(req.params.id)
        if(!book)
            return res.status(404).send()
        if(book.assigned)
            return res.status(400).send()
        await Book.findByIdAndDelete(req.params.id,{useFindAndModify : false})
        res.send(book)
    }catch(e){
        res.status(500).send(e)
    }
})

//Update book detailes
router.put('/books/:id',adminAuth,async(req,res)=>{
    try{
        const book = await Book.findByIdAndUpdate(req.params.id,req.body,{new : true,useFindAndModify : false})
        if(!book)
            return res.status(404).send()
        res.send(book)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router