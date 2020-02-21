const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const User = require('../models/User')
const Room = require('../models/Room')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

//@route        /user/user
//@desc         Returns the logged in users info
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})

//      INVALID
//@route        /user/rooms
//@desc         Gets all the rooms connected to user
router.get('/rooms', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .populate('rooms_active')
        .then(user => {
            res.json(user.rooms_active)
        })
})

//@route        /user/room
//@desc         Creates a new room and adds relations
//@return       Object with the room created, all the rooms connected to the
//              user, and the updated user
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
                            userRooms = rooms.filter(rm => rm.users.includes(user._id))
                            res.json({
                                room,
                                rooms: userRooms,
                                user
                            })
                        })
                    })
                })
            })
    })
})

//@route        /user/room/:rid
//@desc         Adds user to room and connects room to user
//@returns      Updated user
router.put('/room/:rid', auth, (req, res) => {
    Room.findById(req.params.rid).then(room => {
        User.findById(req.user.id)
            .select('-password')
            .then(user => {
                user.rooms_active.push(room._id)
                user.save().then(() => {
                    room.users.push(user._id)
                    room.save().then(() => {
                        res.json(user)
                    })
                })
            })
    })
})

//      TEST
//@route        /user/room/:rid
//desc          Deletes specified room and cascades to connected users
//              list of active rooms and deletes all connected posts and 
//              comments
router.delete('/room/:rid', auth, (req, res) => {
    const rid = req.params.rid
    Room.findByIdAndDelete(rid).then(() => {
        Post.find({ room: rid }).then(posts => {
            Promise.all(
                posts.map(post => {
                    const pid = post._id
                    Comment.deleteMany({ post: pid })
                })
            )
        }).then(() => {
            Post.deleteMany({ room: rid }).then(() => {
                User.find({ rooms_active: { $in: rid } }).then(users => {
                    Promise.all(
                        users.map(user => {
                            User.findOneAndUpdate(
                                user._id,
                                { $pull: { rooms_active: rid } },
                                { new: true }
                            )
                        })
                    )
                })
            })
        })
    })
})

//      INVALID
//@route        /user/posts
//@desc         Gets all posts connected to user
router.get('/posts', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .populate('posts')
        .then(user => {
            res.json(user.posts)
        })
})

//@route        /user/post/:rid
//@desc         Creates a new post within a specified room and adds relations
//@returns      Object with post created, updated list of posts in that room,
//              and the updated room
router.post('/post/:rid', auth, (req, res) => {
    Post.create(req.body).then(post => {
        User.findById(req.user.id)
            .select('-password')
            .then(user => {
                Room.findById(req.params.rid).then(room => {
                    post.user = user._id
                    post.room = room._id
                    post.save().then(() => {
                        room.posts.push(post._id)
                        room.save().then(() => {
                            Post.find({ room: room._id }).populate('user').populate('comments').then(posts => {
                                res.json({
                                    post,
                                    posts,
                                    room
                                })
                            })
                        })
                    })
                })
            })
    })
})

router.delete('/post/:pid', auth, (req, res) => {
    const pid = req.params.pid
    Post.findByIdAndDelete(pid).then(() => {
        Comment.deleteMany({ post: pid }).then(() => {
            Room.findOneAndDelete({ posts: { $in: pid } })
        })
    })
})

//      INVALID
//@route        /user/comments
//@desc         Gets all comments connected to user
router.get('/comments', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .populate('comments')
        .then(user => {
            res.json(user.comments)
        })
})

//@route        /user/comment/:pid
//@desc         Creates a new comment on a specified post and adds relations
//@returns      Object with created comment, updated list of comments on
//              post, and the updated post
router.post('/comment/:pid', auth, (req, res) => {
    Comment.create(req.body).then(comment => {
        User.findById(req.user.id)
            .select('-password')
            .then(user => {
                Post.findById(req.params.pid).then(post => {
                    comment.user = user._id
                    comment.post = post._id
                    comment.save().then(() => {
                        post.comments.push(comment._id)
                        post.save().then(() => {
                            Comment.find({ post: post._id }).then(comments => {
                                res.json({
                                    comment,
                                    comments,
                                    post,
                                    user
                                })
                            })
                        })
                    })
                })
            })
    })
})

module.exports = router