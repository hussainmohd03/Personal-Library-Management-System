const User = require('./../models/user')
const bcrypt = require('bcrypt')

exports.profile_show_get = async (req, res) => {
  const user = await User.findById(req.session.user._id)
  res.render('profile/show.ejs', { user })
}

exports.profile_edit_get = async (req, res) => {
  const profile = await User.findById(req.session.user._id)
  res.render('profile/edit.ejs', { profile })
}

exports.profile_edit_put = async (req, res) => {
  const user = await User.findById(req.session.user._id)
  const profile = await User.findByIdAndUpdate(req.params._id, req.body)

  const validPassword = bcrypt.compareSync(req.body.oldPassword, user.password)
  if (!validPassword) {
    return res.send('Your old password was not correct! Please try again.')
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return res.send('Password and Confirm Password must match')
  }
  const hashedPassword = bcrypt.hashSync(req.body.newPassword, 12)
  user.password = hashedPassword
  await user.save()
  res.render('./profile/show.ejs', { user })
}
