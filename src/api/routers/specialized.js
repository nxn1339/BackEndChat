const express = require('express')
const router = express.Router()
const controller = require('../controllers/specialized')
const { checkLogin } = require('../middlewares/checkLogin')
const { checkAdmin } = require('../middlewares/checkPermission')

router.get('/', async (req, res, next) => {
    try {
        res.json(await controller.getListSpecialized(req.query.keyword, req.query.type))
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        res.json(await controller.getDetailSpecialized(req.params.id))
    } catch (error) {
        next(error)
    }
})

router.post('/', checkLogin, checkAdmin, async (req, res, next) => {
    try {
        res.json(await controller.createSpecialized(req.body))
    } catch (error) {
        next(error)
    }
})

router.put('/:id', checkLogin, checkAdmin, async (req, res, next) => {
    try {
        res.json(await controller.updateSpecialized(req.params.id, req.body))
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', checkLogin, checkAdmin, async (req, res, next) => {
    try {
        res.json(await controller.deleteSpecialized(req.params.id))
    } catch (error) {
        next(error)
    }
})

module.exports = router