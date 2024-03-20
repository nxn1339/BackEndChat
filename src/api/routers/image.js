const express = require('express')
const router = express.Router()
const multer = require('multer')
const controller = require('../controllers/image')
const { checkLogin } = require('../middlewares/checkLogin')

const upload = multer({ dest: 'src/resources' })

router.post('/single', checkLogin,upload.single('image'), async (req, res, next) => {
    try {
        res.json(await controller.uploadImage(req.file))
    } catch (error) {
        next(error)
    }
})

router.post('/multiple', checkLogin, upload.array('images', 10), async (req, res, next) => {
    try {
        res.json(await controller.uploadMultipleImages(req.files))
    } catch (error) {
        next(error)
    }
})

module.exports = router