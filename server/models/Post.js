const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const postSchema = new Schema({
    user: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    },
    room: {
        ref: 'Room',
        type: mongoose.Schema.Types.ObjectId
    },
    message: String,
    date: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            ref: 'Comment',
            type: mongoose.Schema.Types.ObjectId
        }
    ]
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post