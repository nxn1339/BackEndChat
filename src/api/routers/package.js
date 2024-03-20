const express = require('express')
const router = express.Router()
const controller = require('../controllers/package')

router.get('/', async (req, res, next) => {
    try {
        res.json(await controller.getListPackage())
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        res.json(await controller.getListQuestion(req.params.id))
    } catch (error) {
        next(error)
    }
})

router.post('/:id', async (req, res, next) => {
    try {
        res.json(await controller.getResult(req.params.id, req.body.answer))
    } catch (error) {
        next(error)
    }
})

module.exports = router