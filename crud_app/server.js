const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path')
const connectDB = require('./server/database/connection')


const app = express()

// path for env file and file name 
dotenv.config({path:'config.env'})


const PORT = process.env.PORT || 8080

//log requests
app.use(morgan('tiny'))

//cors for all urls routes
app.use(cors());

//mongo connect
connectDB()

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

//view engine
app.set('view engine',"ejs")

//loading public assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))


//loading routes
app.use('/',require('./server/routes/router'))

app.listen(3000, ()=>{console.log(`server running on port http://localhost:${PORT}`)})