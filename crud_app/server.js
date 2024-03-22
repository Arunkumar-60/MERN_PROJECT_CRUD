const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connection');
const bcrypt = require('bcrypt')
const passport = require('passport')
const initializePassport = require('./passport-config')
const flash = require("express-flash")
const session = require('express-session')

const app = express()

// path for env file and file name 
dotenv.config({path:'config.env'})


const PORT = process.env.PORT || 8080

//log requests
app.use(morgan('tiny'))

//cors for all urls routes
app.use(cors());

initializePassport(passport, (email)=>{
    admins.find(admin =>admin.email === email),
    (id)=> admins.find((admin)=> admin.id===id)
})

//mongo connect
connectDB()
//local database
admins=[]

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))



//view engine
app.set('view engine',"ejs")
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())

//loading public assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))



//loading routes
app.use('/',require('./server/routes/router'))



app.get('/login',(req,res)=>{
    res.render('login.ejs')
})

app.get('/register',(req,res)=>{
    res.render('register.ejs')
})

app.post('/register',async(req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,8)

        admins.push({
            id: Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword

        })

        res.redirect('/login');
    }
    catch{
        res.redirect('/register')
    }
})

app.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
}))

// function checkAuthenticated(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect('/login')
// }


app.listen(3000, ()=>{console.log(`server running url for login http://localhost:${PORT}/login`)})