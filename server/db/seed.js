const Room = require('../models/Room')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

Room.deleteMany({}).then(() => {
    Post.deleteMany({}).then(() => {
        Comment.deleteMany({}).then(() => {
            console.log('db deleted, running seed...')
            createData()
        })
    })
})

function createData() {
    Room.create({
        name: 'Room Test'
    }).then(room => {
        Promise.all([
            Post.create({
                message: 'post one'
            }),
            Post.create({
                message: 'post two'
            })
        ]).then(posts => {
            Promise.all([
                Comment.create({
                    message: `comment one`
                }),
                Comment.create({
                    message: `comment two`
                })
            ]).then(comments => {
                posts[0].comments.push(comments[0])
                comments[0].post = posts[0]
                posts[1].comments.push(comments[1])
                comments[1].post = posts[1]
                comments.forEach(comment => {
                    comment.save()
                })
                posts.forEach(post => {
                    room.posts.push(post)
                    post.room = room
                    post.save()
                })
                room.save()
                console.log('created room with posts')
            })
        })
    })
}