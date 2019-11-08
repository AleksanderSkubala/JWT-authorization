const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const passport = require('./auth/auth')
const loginRouter = require('./routes/login.router')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use(passport.initialize())
app.use('/', loginRouter)

app.listen(port)
console.log(`Listening on port: ${port}`);

