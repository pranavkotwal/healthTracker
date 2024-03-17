const express = require('express');
const cors = require('cors')
require('./config/database')
const cookieParser = require('cookie-parser')


const app = express()

app.use(cors({
    origin:['http://localhost:5173'],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
const routes = require('./routes/v1')

// parse cookies 
app.use(cookieParser());
// parse json request body
app.use(express.json());

const port = 3000

// v1 api routes
app.use('/v1',routes)



app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})