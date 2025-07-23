const multer = require('multer')
const path = require('path')
const bookStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/profiles')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: bookStorage })

module.exports = upload
