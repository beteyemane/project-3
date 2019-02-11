const User = require('../models/user')
const jwt = require('jsonwebtoken')
const mailer = require('../lib/mailer')

function registerRoute( req, res, next ) {
  User.create(req.body)
    .then(user => mailer.sendRegistrationEmail(user))
    .then(() => res.status(201).json({ message: 'Registration completed' }))
    .catch(next)
}

function loginRoute( req, res ) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      const payload = { sub: user._id }
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '2h' })

      res.json({
        token,
        message: `Welcome back ${user.username}!`

      })
    })

}





module.exports = {
  register: registerRoute,
  login: loginRoute

}
