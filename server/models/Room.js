const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const roomSchema = new Schema({
    name: String,
    description: String,
    fixed: {
        type: Boolean,
        default: false
    },
    private: {
        type: Boolean,
        default: false
    },
    users: [
        {
            ref: 'User',
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    posts: [
        {
            ref: 'Post',
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

const Room = mongoose.model('Room', roomSchema)

module.exports = Room