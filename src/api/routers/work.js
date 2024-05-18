const express = require('express')
const router = express.Router()
const controller = require('../controllers/work')

router.get('/:id_group', async (req, res, next) => {
    try {
        res.json(await controller.getWorkGroup(req.params.id_group))
    } catch (error) {
        next(error)
    }
})

router.put('/', async (req, res, next) => {
    try {
        res.json(await controller.updateWorkGroup(req.body))
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        res.json(await controller.addWorkGroup(req.body))
    } catch (error) {
        next(error)
    }
})

router.delete('/:id_work', async (req, res, next) => {
    try {
        res.json(await controller.deleteWorkGroup(req.params.id_work))
    } catch (error) {
        next(error)
    }
})


router.get('/Report/:id_work', async (req, res, next) => {
    try {
        res.json(await controller.getReportGroup(req.params.id_work))
    } catch (error) {
        next(error)
    }
})

router.put('/Report', async (req, res, next) => {
    try {
        res.json(await controller.updateReportGroup(req.body))
    } catch (error) {
        next(error)
    }
})

router.post('/Report', async (req, res, next) => {
    try {
        res.json(await controller.addReportGroup(req.body))
    } catch (error) {
        next(error)
    }
})

router.delete('/Report/:id_report', async (req, res, next) => {
    try {
        res.json(await controller.deleteReportGroup(req.params.id_report))
    } catch (error) {
        next(error)
    }
})

module.exports = router