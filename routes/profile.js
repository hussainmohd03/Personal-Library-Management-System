const router = require('express').Router()
const profileCtrl = require('../controllers/profile')
const upload = require('../middleware/upload_profile_img')

router.get('/', profileCtrl.profile_show_get)
router.get('/edit', profileCtrl.profile_edit_get)
router.put('', upload.single('profilePicture'), profileCtrl.profile_edit_put)
module.exports = router
