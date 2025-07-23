const User = require('./../models/user')
const Book = require('../models/book')
const bcrypt = require('bcrypt')

exports.profile_show_get = async (req, res) => {
  const user = await User.findById(req.session.user._id)
  let book = await Book.find({ owner: req.session.user._id })
  const genres = [
    'Fiction',
    'Non-Fiction',
    'Science-Fiction',
    'Fantasy',
    'Mystery',
    'Thriller',
    'Romance',
    'Historical',
    'Biography',
    'Self-Help',
    'Philosophy',
    'Poetry',
    'Horror',
    'Young-Adult',
    'Children',
    'Science',
    'Technology',
    'Religion',
    'Art',
    'Comics'
  ]
  const genreCounts = genres.map((genre) => {
    let count = 0
    for (let i = 0; i < book.length; i++) {
      if (book[i].genre === genre && book[i].borrowHistory.length > 0) {
        count++
      }
    }
    return count
  })

  res.render('profile/show.ejs', { user, book, genres, genreCounts })
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
