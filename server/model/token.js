const mongoose = require('mongoose')


const tokenSchema = mongoose.Schema(
    {
        token:{
            type:String,
            required:true,
            index:true
        },
        user:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'User',
            require:true
        },
        type:{
            type:String,
            enum:['refresh','resetPassword','verifyEmail'],
            required:true
        },
        expires:{
            type:Date,
            required:true
        },
        blacklisted:{
            type:Boolean,
            default:false
        }
    },
    {
        timestamps:true
    }
)

const Token = mongoose.model('Token',tokenSchema)
module.exports = Token;