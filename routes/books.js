const router = require('express').Router()
const bookCtrl = require('../controllers/books')

// API calls
router.get('/new', bookCtrl.books_create_get)
router.post('', bookCtrl.books_create_post)
router.get('', bookCtrl.books_index_get)
router.get('/:bookId', bookCtrl.books_show_get)
router.get('/:bookId/edit', bookCtrl.books_edit_get)
router.put('/:bookId', bookCtrl.books_update_put)
router.delete('/:bookId', bookCtrl.books_delete_delete)

module.exports = router
