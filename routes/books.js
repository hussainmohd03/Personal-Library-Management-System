const router = require('express').Router()
const bookCtrl = require('../controllers/books')
const uploadBookImg = require('../middleware/Upload_Book_Img')
// API calls

//borrowed books
router.get('/borrowed', bookCtrl.books_index_get_borrowed)

//dashboard
router.get('/dashboard', bookCtrl.books_index_get_dashboard)

router.get('/new', bookCtrl.books_create_get)
router.post('/new', uploadBookImg, bookCtrl.books_create_post)
router.get('', bookCtrl.books_index_get)
router.get('/:bookId', bookCtrl.books_show_get)
router.get('/:bookId/edit', bookCtrl.books_edit_get)
router.put('/:bookId', uploadBookImg, bookCtrl.books_update_put)
router.delete('/:bookId', bookCtrl.books_delete_delete)
router.post('', bookCtrl.books_search_post)

//borrow
router.get('/:bookId/borrow', bookCtrl.books_borrow_get)
router.put('/:bookId/borrow', bookCtrl.books_borrow_put)

//return
router.get('/:bookId/return', bookCtrl.books_return_get)
router.put('/:bookId/return', bookCtrl.books_return_put)

module.exports = router
