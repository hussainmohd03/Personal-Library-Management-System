const Book = require('../models/book')


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
