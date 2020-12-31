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

app.use(express.json())

app.use(userRouter)
app.use(bookRouter)

app.listen(port,()=>{
    console.log("Server is on port"+port)
})
