const express = require('express')
const router = express.Router()
const controller = require('../controllers/chat')

router.get('/:id_group', async (req, res, next) => {
    try {
        res.json(await controller.getListChat(req.params.id_group))
    } catch (error) {
        next(error)
    }
})

module.exports = router