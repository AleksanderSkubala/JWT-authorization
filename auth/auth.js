const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const sha = require('sha.js')
const { User } = require('../models')
require('dotenv').config()

passport.use(
  'login',
  new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
  },
  (name, password, callback) => {
    return new User({
      name: name
    })
      .fetch()
      .then((user) => {
        if(!user) {
          return callback(null, false, {
            message: 'Incorrect username :('
          })
        }

        if (
          sha('sha256')
            .update(password)
            .digest('hex') === user.attributes.password
        ) {
          return callback(null, user.attributes, {
            message: 'Logged in successfully !!!'
          })
        } else {
          return callback(null, false, {
            message: 'Incorrect password :('
          })
        }
      })
      .catch(err => callback(err))
  })
)

passport.use(
  'jwt',
  new JWTStrategy({
    secretOrKey: process.env.JWT_KEY,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
  }, (jwtPayload, callback) => {
    callback(null, jwtPayload)
  })
)

module.exports = passport
