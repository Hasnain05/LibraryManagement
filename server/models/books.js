const mongoose = require('mongoose')

module.exports = mongoose.model('books',{
    _id : {
        type : Number
    },
    title : {
        type : String,
        required : true
    },
    genre : {
        type : String
    },
    assigned : {
        type : Boolean,
        default : false
    },
    author : {
        type : Number
    }
})