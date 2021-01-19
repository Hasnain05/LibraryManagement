const jwt = require('jsonwebtoken')
const User = require('../models/users')

const auth = async (req,res,next)=>{
    try{
        const token = req.header('Authorization')
        const decoded = jwt.verify(token,'librarymanagement')
        const user = await User.findOne({_id:decoded._id,'tokens.token':token})
        if(!user){
            throw new Error()
        }
        if(user.role !== 'admin'){
            throw new Error()
        }
        next()
    }catch(e){
        res.status(401).send({error : "Authentication Failure"})
    }
}

module.exports = auth