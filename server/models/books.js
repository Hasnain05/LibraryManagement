const { ObjectID } = require('mongodb')
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
        type : ObjectID,
        default : null,
    },
    author : {
        type : String,
        required : true
    }
})