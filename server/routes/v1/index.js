const express = require('express')
const authRoute = require('./auth.route')
const mediRouter = require('./medical.route')


const router = express.Router()


const defaultRoutes = [
    {
        path:'/auth',
        route: authRoute 
    },
    {
        path:'/user',
        route: mediRouter 
    }
]


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router