const express = require('express')
const mongoose = require('./db/connection')
const cors = require('cors')
const parser = require('body-parser')
const app = express()
const http = require('http')
const session = require('express-session')
const config = require('config')
const socketio = require('socket.io')
const MongoStore = require('connect-mongo')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./socket-users')

app.use(cors())
app.use(parser.urlencoded({ extended: true} ))
app.use(parser.json())
app.use(session({
    // store: new MongoStore({ mongoose.connection }),
    secret: config.get('jwtSecret'),
    resave: false,
    saveUninitialized: false
}))

const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room })
        
        if(error) return callback(error)

        console.log(`${name} has joined ${room.name}`)

        socket.join(user.room)

        io.to(user.room).emit('userJoin')

        callback()
    })

    // socket.on('sendMessage', (message, callback) => {
    //     const user = getUser(socket.id)
    //     io.to(user.room).emit('message', { user: user.name, text: message })
    //     io.to(user.room).emit('roomData', { room: user.room, text: message })

    //     callback()
    // })

    socket.on('sendPost', (room) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('updatePost', room)
    })

    socket.on('disconnect', () => {
        console.log(`disconnected`)        
    })
})

const roomController = require('./controllers/Rooms')
const registerController = require('./controllers/Register')
const loginController = require('./controllers/Login')
const userController = require('./controllers/User')

const router = express.Router()
const basicController = router.get('/', (req, res) => {
    res.send('server is up and running')
})
app.use('/', basicController)
app.use('/rooms', roomController)
app.use('/register', registerController)
app.use('/login', loginController)
app.use('/user', userController)


const PORT = process.env.PORT || 4000

// app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
server.listen(PORT, () => console.log(`Socket listening on port ${PORT}`))