const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "/assets/photos")
  },

  filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
  },
})

module.exports = upload = multer({ storage })