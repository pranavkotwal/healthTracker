const mongoose = require('mongoose')
require('dotenv').config()

module.connect = mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
    console.log("Sucessfully connected to databse")

    }).catch((error)=>{
    console.log("Databse connection failed.. exiting now")
    console.error(error)
    process.exit(1)
    })
