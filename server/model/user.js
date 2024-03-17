const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true

    },
    name:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        required:false,
        default:""
    },
    date:{
        type:Date,
        default:Date.now()

    },
    password:{
        type:String,
        required:true,
    }
},{
    timestamps:true
})

userSchema.statics.isEmailTaken = async function(email, excludeUserId){
    const user = await this.findOne({email,_id:{$ne:excludeUserId}})
    return !!user
}
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};
userSchema.pre('save',async function(next){
    const user = this;
    user.password = await bcrypt.hash(user.password,8)

    next();
})
const User = mongoose.model('User', userSchema);

module.exports = User;