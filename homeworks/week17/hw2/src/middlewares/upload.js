const multer = require('multer')

const storage = multer.diskStorage({
  destination: './src/static/images',
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}${file.originalname.match(/\.(jpg|png|jpeg)$/)[0]}`
    cb(null, `${file.fieldname}-${uniqueSuffix}`)
  }
})
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) return cb(null, false)
    cb(null, true)
  }
})

module.exports = upload
