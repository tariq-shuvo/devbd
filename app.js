var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

// Load Mongo Database Connection
var mongoConnection = require('./config/db')
mongoConnection()

var usersRouter = require('./routes/api/users')
var authRouter = require('./routes/api/auth')
var profileRouter = require('./routes/api/profile')
var postsRouter = require('./routes/api/posts')

var app = express()

app.use(logger('dev'))
app.use(
  express.json({
    extended: false
  })
)
app.use(
  express.urlencoded({
    extended: false
  })
)
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/profile', profileRouter)
app.use('/api/posts', postsRouter)

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use('/', express.static(path.join(__dirname, './client/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'))
  })
}

module.exports = app
