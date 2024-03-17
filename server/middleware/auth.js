const jwt = require('jsonwebtoken')
const User = require('../model/user')
require('dotenv').config()
// Middleware function to verify JWT tokens
const verifyToken = (req, res,next) => {
    // Get token from request headers or wherever it's stored
    console.log("cookies",req.cookies.token.token)
    
    const token = req.cookies.token.token;




   if (!token) {
    return res.json({ status: false })
  }

//   jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
//     if (err) {
//      return res.json({ error:err, status: false })
//     } else {
//       const user = await User.findById(data.sub)
//       if (user) return res.json({ status: true, user: user.name })
//       else return res.json({ status: false })
//     }
//   })

    


    try {
        // Verify the token and decode its payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        console.log('decoded',decoded)
        // Assuming the token payload contains 'sub' field for user ID
        // You can attach decoded data to the request for subsequent middleware or routes to use
        req.userId= decoded.sub;

         // Proceed to the next middleware or route handler
         next()
    } catch (error) {
        // If verification fails, return an error response
        return res.status(401).json({ message: 'Access token is invalid' });
    }
};
module.exports = verifyToken