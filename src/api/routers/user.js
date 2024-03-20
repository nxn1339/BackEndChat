const express = require('express')
const router = express.Router()
const controller = require('../controllers/user')
const { checkLogin } = require('../middlewares/checkLogin')
const { checkMyAccount, checkDeleteUser, checkAdmin } = require('../middlewares/checkPermission')

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

router.post('/register/volunteers', checkLogin, checkAdmin, async (req, res, next) => {
    try {
        res.json(await controller.registerVolunteers(req.body))
    } catch (error) {
        next(error)
    }
})

router.post('/register/admin', checkLogin, checkAdmin, async (req, res, next) => {
    try {
        res.json(await controller.registerAdmin(req.body))
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

router.put('/:id', checkLogin, checkMyAccount, async (req, res, next) => {
    try {
        res.json(await controller.update(req.params.id, req.body))
    } catch (error) {
        next(error)
    }
})

router.put('/change_password/:id', checkLogin, checkMyAccount, async (req, res, next) => {
    try {
        res.json(await controller.changePassword(req.params.id, req.body))
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', checkLogin, checkDeleteUser, async (req, res, next) => {
    try {
        res.json(await controller.deleteUser(req.params.id))
    } catch (error) {
        next(error)
    }
})

module.exports = router