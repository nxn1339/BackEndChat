const express = require('express')
const router = express.Router()
const controller = require('../controllers/group')

router.get('/:id_user', async (req, res, next) => {
    try {
        res.json(await controller.getListGroup(req.params.id_user))
    } catch (error) {
        next(error)
    }
})

router.get('/member/:id_group', async (req, res, next) => {
    try {
        res.json(await controller.getListMember(req.params.id_group))
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        res.json(await controller.createGroup(req.body))
    } catch (error) {
        next(error)
    }
})

module.exports = router