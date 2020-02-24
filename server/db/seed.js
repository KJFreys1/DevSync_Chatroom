const Room = require('../models/Room')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const User = require('../models/User')

Room.deleteMany({}).then(() => {
    User.deleteMany({}).then(() => {
        Post.deleteMany({}).then(() => {
            Comment.deleteMany({}).then(() => {
                console.log('db deleted, running seed...')
                createData()
            })
        })
    })
})

function createData() {
    Room.create({
        name: 'Lobby',
        description: 'This is the main lobby for DevSync',
        fixed: true
    }).then(() => {
        console.log('created main room')
    })
}