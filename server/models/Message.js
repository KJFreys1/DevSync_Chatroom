const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    user: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    },
    message: String,
    date: {
        type: Date,
        default: Date.now
    }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message