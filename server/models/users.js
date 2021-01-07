const mongoose = require('mongoose')

module.exports = mongoose.model('users',{
    email : {
        type : String,
        lowercase : true,
        required : true,
        unique : true
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
