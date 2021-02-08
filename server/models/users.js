const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        lowercase : true,
        required : true,
        unique : true
    },
    password : {
        type : String
    },
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number
    },
    role : {
        type : String,
        enum : ['user','admin'],
        required : true
    },
    tokens: [{
        token : {
            type : String,
            required : true
        }
    }]
})

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id : user._id.toString()},'librarymanagement')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.getOrCreate = async (email,name,role) => {
    const user = await User.findOne({email})
    if(!user){
        const newUser = new User({
            email,name,role
        })
        await newUser.save()
        return newUser
    }else{
        return user
    }
}

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error("Unable to login")
    }

    if(user.password === password)
        return user
    else{
        throw new Error("Wrong Password")
    }
}

const User = mongoose.model('users',userSchema)

module.exports = User
