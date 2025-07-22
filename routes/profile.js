const router = require('express').Router()
const profileCtrl = require('../controllers/profile')

router.get("/", profileCtrl.profile_show_get)
router.get("/sign-in", profileCtrl.profile_edit_get)
router.put("/sign-in", profileCtrl.profile_edit_put)
module.exports = router