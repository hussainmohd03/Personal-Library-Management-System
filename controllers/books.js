const Book = require('../models/book')
// const Borrow = require('../models/book')

// APIs
exports.books_create_get = async (req, res) => {
  res.render('books/new.ejs')
}
exports.books_create_post = async (req, res) => {
  await Book.create(req.body)
  res.redirect('/books')
}
exports.books_index_get = async (req, res) => {
  const books = await Book.find()
  res.render('books/index.ejs', { books })
}
exports.books_show_get = async (req, res) => {
  const book = await Book.findById(req.params.bookId)
  res.render('books/show.ejs', { book })
}
exports.books_edit_get = async (req, res) => {
  const book = await Book.findById(req.params.bookId)
  res.render('books/edit.ejs', { book })
}
exports.books_update_put = async (req, res) => {
  await Book.findByIdAndUpdate(req.params.bookId, req.body)
  res.redirect(`/books/${req.params.bookId}`)
}
exports.books_delete_delete = async (req, res) => {
  await Book.findByIdAndDelete(req.params.bookId)
  res.redirect('/books')
}

//borrow

exports.books_borrow_get = async (req, res) => {
  // const currentUser = await User.findById(req.session.user._id)
  const book = await Book.findById(req.params.bookId)
  res.render(`books/borrow.ejs`, { book })
}

exports.books_borrow_put = async (req, res) => {
  const book = await Book.findById(req.params.bookId)
  book.isBorrowed = true
  book.borrowHistory.push(req.body)
  book.save()

  res.redirect(`/books/${req.params.bookId}`)
}

//return
exports.books_return_get = async (req, res) => {
  const book = await Book.findById(req.params.bookId)
  const borrowInfo = book.borrowHistory.pop()

  await book.updateOne({ $pop: { borrowHistory: -1 } })

  res.render(`books/return.ejs`, { book, borrowInfo })
}

exports.books_return_put = async (req, res) => {
  const book = await Book.findById(req.params.bookId)

  book.isBorrowed = false
  book.borrowHistory.push(req.body)
  book.save()

  res.redirect(`/books/${req.params.bookId}`)
}
