const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path')

const app = express()

// path for env file and file name 
dotenv.config({path:'config.env'})


const PORT = process.env.PORT || 8080

//log requests
app.use(morgan('tiny'))

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

//view engine
app.set('view engine',"ejs")

//loading public assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))



app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/add-user',(req,res)=>{
    res.render('add_user')
})

app.get('/update-user',(Req,res)=>{
    res.render('update_user')
})

app.listen(3000, ()=>{console.log(`server running on port http://localhost:${PORT}`)})