const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.post('/login', (req, res, callback) => {
  passport.authenticate('login', { session: false }, (err, user, info)=>{
    if (err || !user) {
      return res.status(400).json({
        message: 'Something went wrong',
        info: info
      })
    }
    req.login(user, { session: false }, () => {
      const token = jwt.sign(
        {
          userId: user.UserID,
        },
        process.env.JWT_KEY,
      )
      return res.json({ token, user })
    })
  })(req, res, callback)
})

module.exports = router;