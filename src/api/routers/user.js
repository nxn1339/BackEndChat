const express = require('express')
const router = express.Router()
const controller = require('../controllers/user')
const { checkLogin } = require('../middlewares/checkLogin')

router.get('/:id', async (req, res, next) => {
    try {
        res.json(await controller.getDetailInfo(req.params.id))
    } catch (error) {
        next(error)
    }
})

router.post('/register', async (req, res, next) => {
    try {
        res.json(await controller.register(req.body))
    } catch (error) {
        next(error)
    }
})


router.post('/login', async (req, res, next) => {
    try {
        res.json(await controller.login(req.body))
    } catch (error) {
        next(error)
    }
})

router.put('/:id', checkLogin, async (req, res, next) => {
    try {
        res.json(await controller.update(req.params.id, req.body))
    } catch (error) {
        next(error)
    }
})

router.put('/change_password/:id', checkLogin, async (req, res, next) => {
    try {
        res.json(await controller.changePassword(req.params.id, req.body))
    } catch (error) {
        next(error)
    }
})

router.get('/', async (req, res, next) => {
    try {
        res.json(await controller.getListUser(req.query.keyword))
    } catch (error) {
        next(error)
    }
})

router.get('/member/:id_group', async (req, res, next) => {
    try {
        res.json(await controller.getListUserNotInGroup(req.params.id_group))
    } catch (error) {
        next(error)
    }
})

module.exports = router