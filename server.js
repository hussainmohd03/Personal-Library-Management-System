// imports
const express = require('express')
require('dotenv').config()
const session = require('express-session')
const path = require('path')

// Initialize app
const app = express()

// Database Configuration
const mongoose = require('./config/db')

// set Port Configuration
const port = process.env.PORT ? process.env.PORT : 3000

// Require MiddleWares
const methodOverride = require('method-override')
const morgan = require('morgan')

// Require passUserToView & isSignedIn middlewares

// use MiddleWares
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(express.static('public'))

// Session Configurations
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)

//passUserToView middleware

// Root Route
app.get('/', (req, res) => {
  res.render('index.ejs')
})

// Require Routers
const authRouter = require('./routes/auth')
const bookRouter = require('./routes/books')

// use Routers
app.use('/books', bookRouter)
// use isAuthenticated middleware

// Listener
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
