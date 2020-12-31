const mongoose = require('mongoose')

module.exports = mongoose.model('users',{
    _id : {
        type : Number,
        required : true
    },
    email : {
        type : String,
        lowercase : true,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    books : {
        type : Array
    }
})
