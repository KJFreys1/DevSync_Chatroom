const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            ref: 'Comment',
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    posts: [
        {
            ref: 'Post',
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    messages_active: [
        {
            ref: 'MessageList',
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    rooms_active: [
        {
            ref: 'Room',
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    rooms_favorited: [
        {
            ref: 'Room',
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    friends: [
        {
            ref: 'User',
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    friends_favorited: [
        {
            ref: 'User',
            type: mongoose.Schema.Types.ObjectId
        }
    ]
})

const User = mongoose.model('User', userSchema)

module.exports = User