const multer = require('multer')
const path = require('path')
const bookStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: bookStorage })

const multiUpload = upload.fields([{ name: 'imgUrl' }, { name: 'ebookPath' }])

module.exports = multiUpload
