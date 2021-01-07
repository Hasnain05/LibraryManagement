const mongoose = require('mongoose')

module.exports = mongoose.model('books',{
    title : {
        type : String,
        required : true
    },
    genre : {
        type : String,
        required : true
    },
    assigned : {
        type : Boolean,
        default : false,
    },
    author : {
        type : String,
        required : true
    }
})