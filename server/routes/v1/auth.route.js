const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const authController = require('../../controllers/auth.controller')


 // TODO : Add controllers

router.post('/register',authController.register)
router.post('/login',authController.login)
router.post('/logout',authController.logout)
router.get('/user',auth,authController.home)

router.get('/test',auth,(req,res)=>{
    console.log("userID",req.userId)
})

module.exports = router

