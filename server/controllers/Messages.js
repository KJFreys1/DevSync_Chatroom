const express = require('express')
const router = express.Router()

const MessageList = require('../models/MessageList')
const Message = require('../models/Message')

router.get('/', (req, res) => {
    MessageList.find({}).populate('messages').then(list => {
        res.json(list)
    })
})

module.exports = router