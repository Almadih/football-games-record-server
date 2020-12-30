const cors = require('cors')
const express = require('express')
const app = express()
const api = require('./http/api')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const token = require('./http/middlewares/token')
const {connectDb} = require('./database')
const path = require('path')
const errorHandler = require('./http/middlewares/errorHandler')
require('dotenv').config()


//express config
app.use(cors())
app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

//api
app.use('/api',token,api)

//global error handler
app.use(errorHandler)

//database connection
connectDb().then().catch(console.log)

//config port based on env
const PORT = process.env.NODE_ENV == 'production'?process.env.PORT:process.env.PORT_DEV

//starting server
app.listen(PORT,()=>console.log(`server running at port : ${PORT}`))