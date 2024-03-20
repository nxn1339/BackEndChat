const express = require('express')
const router = express.Router()
const controller = require('../controllers/field')
const { checkLogin } = require('../middlewares/checkLogin')
const { checkAdmin } = require('../middlewares/checkPermission')

router.get('/', async (req, res, next) => {
    try {
        res.json(await controller.getListField(req.query.keyword))
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        res.json(await controller.getDetailField(req.params.id))
    } catch (error) {
        next(error)
    }
})

router.post('/', checkLogin, checkAdmin, async (req, res, next) => {
    try {
        res.json(await controller.createField(req.body))
    } catch (error) {
        next(error)
    }
})

router.put('/:id', checkLogin, checkAdmin, async (req, res, next) => {
    try {
        res.json(await controller.updateField(req.params.id, req.body))
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', checkLogin, checkAdmin, async (req, res, next) => {
    try {
        res.json(await controller.deleteField(req.params.id))
    } catch (error) {
        next(error)
    }
})

module.exports = router