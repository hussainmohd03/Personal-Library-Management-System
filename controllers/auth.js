const User = require('./../models/user')
const bcrypt = require('bcrypt')

// APIs

exports.auth_signup_get = async (req, res) => {
  res.render('auth/sign-up.ejs')
}
exports.auth_signup_post = async (req, res) => {
  const userFinder = await User.findOne({ username: req.body.username })
  if (userFinder) {
    return res.send('The username was taken!! please type another')
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.send('The password and confirm password must be the same')
  }

  if (req.file) {
    req.body.profilePicture = req.file.path
  }
  req.body.profilePicture = req.body.profilePicture.replace('public', '')
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword

  const user = await User.create(req.body)
  res.send(`Your username is ${user.username}, Thank you for signing up`)
}


exports.auth_signin_get = async (req, res) => {
  res.render('auth/sign-in.ejs')
}
exports.auth_signin_post = async (req, res) => {
  const userFinder = await User.findOne({ username: req.body.username })
  if (!userFinder) {
    return res.send('Login Failed, Try Again!')
  }
  // userFinder.password
  if (!bcrypt.compareSync(req.body.password, userFinder.password)) {
    return res.send('Login Failed, Try Again!')
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
