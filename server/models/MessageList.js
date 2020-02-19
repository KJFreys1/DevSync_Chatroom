const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const messageListSchema = new Schema({
    users: [
        {
            ref: 'User',
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
    messages: [
        {
            ref: 'Message',
            type: mongoose.Schema.Types.ObjectId
        }
    ]
})

const MessageList = mongoose.model('MessageList', messageListSchema)

module.exports = MessageList