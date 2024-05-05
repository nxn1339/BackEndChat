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

router.get('/member/:id_group' ,async (req, res, next) => {
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

router.post('/member', async (req, res, next) => {
    try {
        res.json(await controller.addMember(req.body))
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        res.json(await controller.deleteGroup(req.params.id))
    } catch (error) {
        next(error)
    }
})

router.delete('/member/:id_user', async (req, res, next) => {
    try {
        res.json(await controller.deleteMember(req.params.id_user))
    } catch (error) {
        next(error)
    }

 
})

router.put('/', async (req, res, next) => {
    try {
        res.json(await controller.updateReadMessage(req.body))
    } catch (error) {
        next(error)
    }})

 router.get('/:id_user/:id_group', async (req, res, next) => {
     try {
         res.json(await controller.getStatusMessage(req.params.id_user,req.params.id_group))
     } catch (error) {
         next(error)
     }})

module.exports = router