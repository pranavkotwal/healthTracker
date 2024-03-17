const jwt = require('jsonwebtoken')
const moment = require('moment');
const httpStatus = require('http-status')
const userService = require('./user.service')
const Token = require('../model/token')


const generateToken = (userId,expires,type,secret=process.env.JWT_SECRET) =>{
    const payload = {
        sub:userId,
        iat:moment().unix(),
        exp:expires.unix(),
        type

    }
    return jwt.sign(payload,secret)
}

const saveToken = async (token,userId,expires,type,blacklisted=false)=>{
    const tokenDoc = await Token.create({
        token,
        user:userId,
        expires:expires.toDate(),
        type,
        blacklisted
    })
    return tokenDoc
}

const verifyToken = async (token,type)=>{
    const payload = jwt.verify(token,process.env.JWT_SECRET)
    const tokenDoc = await Token.findOne({token,type,user:payload.sub,blacklisted:false})

    if(!tokenDoc){
        throw new Error('Token Not Found')
    }
    return tokenDoc
}


const generateAuthTokens = async(user)=>{
    const accessTokenExpires = moment().add(300,'minutes')
    const accessToken = generateToken(user.id,accessTokenExpires,'access')

    const refreshTokenExpires = moment().add(30,'days')
    const refreshToken = generateToken(user.id,refreshTokenExpires,'refresh')

    await saveToken(refreshToken,user.id,refreshTokenExpires,'refresh')

    return{

        access:{
            token:accessToken,
            expires:accessTokenExpires.toDate()
        },
        refresh:{
            token:refreshToken,
            expires:refreshTokenExpires.toDate()

        }
    }

}

const generateResetPasswordToken = async (email) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new Error(httpStatus.NOT_FOUND, 'No users found with this email');
  }
  const expires = moment().add(30, 'minutes');
  const resetPasswordToken = generateToken(user.id, expires, 'resetPassword');
  await saveToken(resetPasswordToken, user.id, expires, 'resetPassword');
  return resetPasswordToken;
};

const generateVerifyEmailToken = async (user) => {
  const expires = moment().add(30, 'minutes');
  const verifyEmailToken = generateToken(user.id, expires, 'verifyEmail');
  await saveToken(verifyEmailToken, user.id, expires, 'verifyEmail');
  return verifyEmailToken;
};

module.exports = {
    saveToken,
    generateToken,
    generateAuthTokens,
    verifyToken,
    generateResetPasswordToken,
    generateVerifyEmailToken
}