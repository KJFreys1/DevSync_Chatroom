const express = require('express')
const router = express.Router()

const Room = require('../models/Room')

router.get('/', (req, res) => {
    Room.find({}).then(room => {
        res.json(room)
    })
})

module.exports = router