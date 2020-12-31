const express = require('express')
const Book = require('../models/books')
const router = new express.Router()

//Create Book
router.post('/books',async (req,res)=>{
    console.log("Hello")
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
        const books = await Book.find()
        res.status(200).send(books)
    }catch(e){
        res.status(500).send(e)
    }
})

//List All Assigned Books
router.get('/books/assigned',async (req,res)=>{
    try{
        const books = await Book.find({assigned : true})
        res.status(200).send(books)
    }catch(e){
        res.status(500).send(e)
    }
})

//List All UnAssigned Books
router.get('/books/unassigned',async (req,res)=>{
    try{
        const books = await Book.find({assigned : false})
        res.status(200).send(books)
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

module.exports = router