const express = require('express')
const router = express.Router()
const controller = require('../controllers/message')

router.get('/', async (req, res, next) => {
    try {
        res.json(await controller.getListMessage(req.query.keyword))
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        res.json(await controller.addMessage(req.body))
    } catch (error) {
        next(error)
    }
})

module.exports = router