const Room = require('../models/Room')
const Post = require('../models/Post')

Room.deleteMany({}).then(() => {
    Post.deleteMany({}).then(() => {
        console.log('db deleted, running seed...')
        createData()
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
            posts.forEach(post => {
                room.posts.push(post)
                post.room = room
                post.save()
            })
            room.save()
            console.log('created room with posts')
        })
    })
}