const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const User = require('../models/User')
const Room = require('../models/Room')
const Post = require('../models/Post')

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})

router.get('/rooms', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .populate('rooms_active')
        .then(user => {
            res.json(user.rooms_active)
        })
})

router.post('/room', auth, (req, res) => {
    Room.create(req.body).then(room => {
        User.findById(req.user.id)
            .select('-password')
            .then(user => {
                user.rooms_active.push(room._id)
                user.save().then(() => {
                    room.users.push(user._id)
                    room.save().then(() => {
                        Room.find({}).then(rooms => {
                            res.json({
                                room,
                                rooms,
                                user
                            })
                        })
                    })
                })
            })
    })
})

router.get('/posts', (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .populate('posts')
        .then(user => {
            res.json(user.posts)
        })
})

router.post('/post/:rid', auth, (req, res) => {
    Post.create(req.body).then(post => {
        User.findById(req.user.id)
            .select('-password')
            .then(user => {
                Room.findById(req.params.rid).then(room => {
                    user.posts.push(post._id)
                    user.save().then(() => {
                        post.user = user._id
                        post.room = room._id
                        post.save().then(() => {
                            room.posts.push(post._id)
                            room.save().then(() => {
                                Post.find({ room: room._id }).then(posts => {
                                    res.json({
                                        post,
                                        posts,
                                        room,
                                        user
                                    })
                                })
                            })
                        })
                    })
                })
            })
    })
})

module.exports = router