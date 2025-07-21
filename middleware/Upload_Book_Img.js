const multer = require('multer')
const path = require('path')
const bookStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/BookImages')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const uploadBookImg = multer({ storage: bookStorage })

module.exports = uploadBookImg
