const express = require('express')
const router = express.Router()
const controller = require('../controllers/news')
const { checkLogin } = require('../middlewares/checkLogin')
const { checkPostNews } = require('../middlewares/checkPermission')

router.get('/', async (req, res, next) => {
    try {
        res.json(await controller.getNews(req.query.page, req.query.keyword))
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        res.json(await controller.getDetailNews(req.params.id))
    } catch (error) {
        next(error)
    }
})

router.post('/', checkLogin, checkPostNews, async (req, res, next) => {
    try {
        res.json(await controller.createNews(req.payload.id, req.body))
    } catch (error) {
        next(error)
    }
})

router.put('/:id', checkLogin, async (req, res, next) => {
    try {
        res.json(await controller.updateNews(req.payload.id, req.params.id, req.body))
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', checkLogin, async (req, res, next) => {
    try {
        res.json(await controller.deleteNews(req.payload.id, req.params.id))
    } catch (error) {
        next(error)
    }
})

module.exports = router