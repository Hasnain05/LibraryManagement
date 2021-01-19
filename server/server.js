const mongoose = require('mongoose')
const express = require('express')

const database = require('./config/database')
const userRouter = require('./routers/users')
const bookRouter = require('./routers/books')

mongoose.connect(database.url,{
    useNewUrlParser : true,
    useCreateIndex : true
})

const app = express()
const port = 3000

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS")
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next()
  })
  
app.use(express.json())

app.use(userRouter)
app.use(bookRouter)

app.listen(port,()=>{
    console.log("Server is on port"+port)
})
