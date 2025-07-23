const User = require('./../models/user')
const bcrypt = require('bcrypt')

// APIs

exports.auth_signup_get = async (req, res) => {
  res.render('auth/sign-up.ejs')
}
exports.auth_signup_post = async (req, res) => {
  let errMsg = ''
  const userFinder = await User.findOne({ username: req.body.username })
  const emailFinder = await User.findOne({ email: req.body.email })
  if (userFinder) {
    errMsg = 'The username was already taken!'
    return res.render('auth/sign-up.ejs', { errMsg })
  }
  if (emailFinder) {
    errMsg = 'The email was already taken!'
    return res.render('auth/sign-up.ejs', { errMsg })
  }
  if (req.body.password !== req.body.confirmPassword) {
    errMsg = 'The password and confirm password must be the same!'
    return res.render('auth/sign-up.ejs', { errMsg })
  }

  if (req.file) {
    req.body.profilePicture = req.file.path
    req.body.profilePicture = req.body.profilePicture.replace('public', '')
  }
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword

  const user = await User.create(req.body)
  res.render('auth/thanks.ejs')
}

exports.auth_signin_get = async (req, res) => {
  res.render('auth/sign-in.ejs')
}
exports.auth_signin_post = async (req, res) => {
  let errMsg = ''
  const userFinder = await User.findOne({ username: req.body.username })
  if (!userFinder) {
    errMsg = 'Login Failed, Try Again!'
    return res.render('auth/sign-in.ejs', { errMsg })
  }
  // userFinder.password
  if (!bcrypt.compareSync(req.body.password, userFinder.password)) {
    errMsg = 'Login Failed, Try Again!'
    return res.render('auth/sign-in.ejs', { errMsg })
  }

  req.session.user = {
    username: userFinder.username,
    _id: userFinder._id
  }
  res.redirect('/')
}

exports.auth_signout_get = (req, res) => {
  req.session.destroy()
  res.redirect('/')
}
