const httpStatus = require('http-status')
const tokenService = require('./token.service')
const Token = require('../model/token')
const  userService  = require('./user.service')


const loginWithEmailAndPassword = async(email,password)=>{
    const user = await userService.getUserByEmail(email)
    if(!user || !(await user.isPasswordMatch(password))){
        console.log('pass not right')
    }
    return user



}

const logout = async (refreshToken)=>{
    const refreshTokenDoc = await Token.findOne({token:refreshToken,type:'refresh',blacklisted:false})
    if(!refreshTokenDoc){
        throw new Error(httpStatus.NOT_FOUND,'not found')
    }
    await refreshTokenDoc.remove()
}

const refreshAuth = async (refreshToken) =>{
    try{
        const refreshTokenDoc = await tokenService.verifyToken(refreshToken,'refresh')
        const user =  await userService.getUserById(refreshTokenDoc.user)

        if(!user){
            throw new Error()
        }
        await refreshTokenDoc.remove()
        return tokenService.generateAuthTokens(user)
    }catch(error){
        throw new Error(httpStatus.UNAUTHORIZED,'please authenticate')
    }
}

module.exports = {
    loginWithEmailAndPassword,
    logout,
    refreshAuth
}