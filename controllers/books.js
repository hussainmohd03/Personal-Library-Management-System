const Book = require('../models/book')

// APIs
exports.books_create_get = async (req, res) => {
  res.render('books/new.ejs')
}
exports.books_create_post = async (req, res) => {
  req.body.imgUrl = req.file.path
  req.body.imgUrl = req.body.imgUrl.replace('public', '')
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
exports.books_search_post = async (req, res) => {
  const queryString = req.body.search
  const queryStrings = queryString.split(' ')
  allQueries = []
  queryStrings.forEach((element) => {
    allQueries.push({ title: { $regex: String(element) } })
  })
  let books = await Book.find({ $or: allQueries })
  res.render('books/index.ejs', { books })
}

//borrow

exports.books_borrow_get = async (req, res) => {
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

  const borrowInfo = book.borrowHistory[book.borrowHistory.length - 1]

  res.render(`books/return.ejs`, { book, borrowInfo })
}

exports.books_return_put = async (req, res) => {
  const book = await Book.findById(req.params.bookId)
  book.borrowHistory[book.borrowHistory.length - 1] = req.body

  book.isBorrowed = false
  await book.save()

  res.redirect(`/books/${req.params.bookId}`)
}

//borrowed books
exports.books_index_get_borrowed = async (req, res) => {
  const books = await Book.find({ isBorrowed: true })
  res.render('books/borrowed.ejs', { books })
}
