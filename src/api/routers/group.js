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

module.exports = router