const express = require('express')
const router = express.Router()
const controller = require('../controllers/group')

router.get('/:type/:id_user', async (req, res, next) => {
    try {
        res.json(await controller.getListGroup(req.params.type, req.params.id_user,req.query.keyword));
    } catch (error) {
        next(error);
    }
});

router.get('/:id_group' ,async (req, res, next) => {
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

router.delete('/member/:id_user/:id_group', async (req, res, next) => {
    try {
        res.json(await controller.deleteMember(req.params.id_user,req.params.id_group))
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

 router.get('/Status/:id_user/:id_group', async (req, res, next) => {
     try {
         res.json(await controller.getStatusMessage(req.params.id_user,req.params.id_group))
     } catch (error) {
         next(error)
     }})

     router.put('/Change', async (req, res, next) => {
        try {
            res.json(await controller.updateGroup(req.body))
        } catch (error) {
            next(error)
        }})

        router.get('/Check/:id_user1/:id_user2', async (req, res, next) => {
            try {
                res.json(await controller.checkSingleGroup(req.params.id_user1,req.params.id_user2))
            } catch (error) {
                next(error)
            }})

module.exports = router