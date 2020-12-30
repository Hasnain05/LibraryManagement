const mongoose = require('mongoose')

module.exports = mongoose.model('users',{
    _id : {
        type : Number,
        required : true
    },
    email : {
        type : String
    },
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number
    },
    books : {
        type : Array
    }
})
