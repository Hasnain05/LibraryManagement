const express = require('express')
const User = require('../models/users')
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

//List All Users
router.get('/users',async (req,res)=>{
    try{
        const users = await User.find()
        res.status(200).send(users)
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

module.exports = router