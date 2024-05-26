const express = require('express')
const router = express.Router()
const controller = require('../controllers/chat')
const { checkLogin } = require('../middlewares/checkLogin')

router.get('/:id_group', async (req, res, next) => {
    try {
        res.json(await controller.getListChat(req.params.id_group,req.query.page))
    } catch (error) {
        next(error)
    }
})

router.post('/',checkLogin ,async (req, res, next) => {
    try {
        res.json(await controller.addChat(req.body))
    } catch (error) {
        next(error)
    }
})

router.get('/last/:id_group', async (req, res, next) => {
    try {
        res.json(await controller.getLastChat(req.params.id_group))
    } catch (error) {
        next(error)
    }
})

module.exports = router