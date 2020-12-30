const mongoose = require('mongoose')

const database = require('./config/database')
const User = require('./models/users')
const Book = require('./models/books')

mongoose.connect(database.url,{
    useNewUrlParser : true,
    useCreateIndex : true
})

// const me = new User({
//     _id : 12346,
//     name : "rohan"
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error.errmsg)
// })

const newbook = new Book({
    _id : 3,
    title : "The Alchemist"
})

newbook.save().then(()=>{
    console.log(newbook)
}).catch((error)=>{
    console.log(error)
})