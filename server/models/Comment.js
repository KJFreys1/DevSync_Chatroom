const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    user: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    },
    message: String,
    date: {
        type: Date,
        default: Date.now
    },
    post: {
        ref: 'Post',
        type: mongoose.Schema.Types.ObjectId
    }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment