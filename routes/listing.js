const router = require('express').Router()
const listCtrl = require("../controllers/listing")


router.get("/", listCtrl.list_show_get)


module.exports = router