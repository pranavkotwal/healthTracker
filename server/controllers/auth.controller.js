const httpStatus = require('http-status')
const {authService,tokenService,userService} = require('../service')



//register

const register = async(req,res)=>{
    try {
        const user = await userService.createUser(req.body)
        const tokens = await tokenService.generateAuthTokens(user)

        res.cookie("token",tokens.access,{
            withCredentials:true,
            httpOnly:false
        })
        res.status(httpStatus.CREATED).send({
            message:"User signed up succssfully",
            success:true,
            user,tokens}
            )
    } catch (error) {
        console.log('error with registration',error)
        
    }
}

// login 
const login = async(req,res,next)=>{
    try {
        const {email,password} = req.body;
        const user = await authService.loginWithEmailAndPassword(email,password)
        const tokens = await tokenService.generateAuthTokens(user)
        res.cookie("token",tokens.access,{
            withCredentials:true,
            httpOnly:false
        })
        res.status(httpStatus.CREATED).send({
            message:"User Logged in Sucessfully",
            success:true,
            user,tokens}
            )
            next()

    } catch (error) {
        console.log(error)
        
    }
}
const home = async(req,res)=>{
    try {
        console.log('user',req.userId)
        const user = await userService.getUserbyId(req.userId)

        if (user) return res.status(200).json({status:true,user})
    } catch (error) {
        res.status(401).json({message:"You're not logged in"})
        
    }
}


// logout

const logout = async (req,res)=>{
   try {
     await authService.logout(req.body.refreshToken)
     res.send({...tokens})
   } catch (error) {
     res.send({
            staus:httpStatus.NO_CONTENT,
            message:'failed to logout',
            error
        })
    
   }
}

//refreshtokens
const refreshTokens = async (req,res)=>{
     const tokens = await authService.refreshAuth(req.body.refreshToken);
     res.send({ ...tokens });
}


//forgotpasswords


//reset password


//send verification email


// verify email


module.exports = {
    register,
    login,
    logout,
    refreshTokens,
    home
}