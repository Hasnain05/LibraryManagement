const express = require('express')
const Book = require('../models/books')
const router = new express.Router()

//Create Book
router.post('/books',async (req,res)=>{
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
        const books = await Book.find(req.query)
        res.send(books)
    }catch(e){
        res.status(500).send(e)
    }
})

//List All Assigned Books
router.get('/books/assigned',async (req,res)=>{
    try{
        const books = await Book.find({assigned : true})
        res.send(books)
    }catch(e){
        res.status(500).send(e)
    }
})

//List All UnAssigned Books
router.get('/books/unassigned',async (req,res)=>{
    try{
        const books = await Book.find({assigned : false})
        res.send(books)
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
router.delete('/books/:id',async(req,res)=>{
    try{
        const book = await Book.findByIdAndDelete(req.params.id,{useFindAndModify : false})
        if(!book)
            return res.status(404).send()
        res.send(book)
    }catch(e){
        res.status(500).send(e)
    }
})

//Update book detailes
router.put('/books/:id',async(req,res)=>{
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