const router = require('express').Router()
const profileCtrl = require('../controllers/profile')

router.get('/', profileCtrl.profile_show_get)
router.get('/edit', profileCtrl.profile_edit_get)
router.put('', profileCtrl.profile_edit_put)
module.exports = router
