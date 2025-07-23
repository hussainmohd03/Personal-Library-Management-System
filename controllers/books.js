const Book = require('../models/book')

// APIs
exports.books_create_get = async (req, res) => {
  res.render('books/new.ejs')
}
exports.books_create_post = async (req, res) => {
  if (req.body.isEbook === 'on') {
    req.body.isEbook = true
    req.body.ebookPath = req.files.ebookPath[0].path
    req.body.ebookPath = req.body.ebookPath.replace('public', '')
  }
  req.body.imgUrl = req.files.imgUrl[0].path
  req.body.imgUrl = req.body.imgUrl.replace('public', '')
  req.body.owner = req.session.user._id
  await Book.create(req.body)
  res.redirect('/books')
}
exports.books_index_get = async (req, res) => {
  const books = await Book.find({ owner: req.session.user._id })
  res.render('books/index.ejs', { books })
}
exports.books_show_get = async (req, res) => {
  const book = await Book.findById(req.params.bookId)
  if (!book.owner._id.equals(req.session.user._id)) {
    return res.redirect('/books')
  }
  res.render('books/show.ejs', { book })
}
exports.books_edit_get = async (req, res) => {
  const book = await Book.findById(req.params.bookId)
  if (!book.owner._id.equals(req.session.user._id)) {
    return res.redirect('/books')
  }
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
    allQueries.push({ title: { $regex: String(element), $options: 'i' } })
  })
  let books = await Book.find({ $or: allQueries, owner: req.session.user._id })
  res.render('books/index.ejs', { books })
}

//borrow

exports.books_borrow_get = async (req, res) => {
  const book = await Book.findById(req.params.bookId)
  if (!book.owner._id.equals(req.session.user._id)) {
    return res.redirect('/books')
  }
  res.render(`books/borrow.ejs`, { book })
}

exports.books_borrow_put = async (req, res) => {
  const book = await Book.findById(req.params.bookId)
  book.isBorrowed = true
  book.borrowHistory.push(req.body)
  book.save()
  let lastIndex = book.borrowHistory.length
  let borrower = book.borrowHistory[lastIndex - 1]

  res.render('books/confirm.ejs', { borrower })
}

//return
exports.books_return_get = async (req, res) => {
  const book = await Book.findById(req.params.bookId)
  if (!book.owner._id.equals(req.session.user._id)) {
    return res.redirect('/books')
  }
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
  const books = await Book.find({
    isBorrowed: true,
    owner: req.session.user._id
  })

  res.render('books/borrowed.ejs', { books })
}

//dashboard
exports.books_index_get_dashboard = async (req, res) => {

  const book = await Book.find({ owner: req.session.user._id })

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
  // const bookGenre = book.map((book) => book.genre) creates an array of just genres

  //loop
  const genreCounts = genres.map((genre) => {
    let count = 0
    for (let i = 0; i < book.length; i++) {
      if (book[i].genre === genre) {
        count++
      }
    }
    return count
  })

  let popularGenre
  let j = 0
  for (let i = 0; i < genreCounts.length; i++) {
    if (genreCounts[i] > j) {
      j = genreCounts[i]
      popularGenre = genres[i]
    }
  }

  //fisher yates shuffle function:
  let shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  book = shuffle(book).slice(0, 2) //only print two books

  res.render('books/dashboard.ejs', {
    book,
    genreCounts,
    popularGenre
  })
}
