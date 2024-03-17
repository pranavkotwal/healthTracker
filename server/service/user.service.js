const User = require('../model/user')
const httpStatus = require('http-status')

// create user
const createUser = async (userBody)=>{
    if(await User.isEmailTaken(userBody.email)){
        throw Error(httpStatus.BAD_REQUEST,'Email already taken')
    }
    return User.create(userBody)
}

// delete user by email
const deleteUserByEmail = async (email) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
}

const getUserbyId = async(userId)=>{
  const user = await User.findById(userId)
  if(!user){
    console.log("user doesn't exist")
  }
  return user;
}


//get user by email

const getUserByEmail = async (email) => {
  return User.findOne( {email} )
};

module.exports = {
    createUser,
    deleteUserByEmail,
    getUserByEmail,
    getUserbyId
}