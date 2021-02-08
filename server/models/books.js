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
        type : Boolean,
        default : false,
    },
    user : {
        type : ObjectID,
        default : null,
    },
    author : {
        type : String,
        required : true
    },
    coverImage:{
        type : String
    },
    summary:{
        type : String
    }
})