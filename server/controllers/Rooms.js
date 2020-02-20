//This controller file is specific to rooms and their posts and comments.
//It does not include User data.

const express = require('express')
const router = express.Router()

const Room = require('../models/Room')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

//@route        /rooms
//@desc         Gets all the rooms in the database, used for browsing rooms
router.get('/', (req, res) => {
    Room.find({}).then(rooms => {
        res.json(rooms)
    })
})

//@route        /rooms/id/:id
//@desc         Gets a specific room by id and returns its posts and their comments
router.get('/id/:id', (req, res) => {
    Post.find({room: req.params.id}).populate('comments').then(post => {
        res.json(post)
    })
})

//@route        /rooms
//@desc         Posts a new room to the database, then returns a list of all new
//              existing rooms and the room just created
router.post('/', (req, res) => {
    Room.create(req.body).then(new_room => {
        Room.find({}).then(rooms => {
            res.json({rooms, new_room})
        })
    })
})

//@route        /rooms/posts
//@desc         Gets all posts in database with populated comments
router.get('/posts', (req, res) => {
    Post.find({}).populate('comments').then(posts => {
        res.json(posts)
    })
})

router.post('/posts', (req, res) => {
    Post.create(req.body).then(new_post => {
        res.json(new_post)
    })
})

module.exports = router