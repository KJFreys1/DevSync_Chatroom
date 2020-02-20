const express = require('express')
const mongoose = require('./db/connection')
const cors = require('cors')
const parser = require('body-parser')
const app = express()
const session = require('express-session')
const config = require('config')
const MongoStore = require('connect-mongo')

app.use(cors())
app.use(parser.urlencoded({ extended: true} ))
app.use(parser.json())
app.use(session({
    // store: new MongoStore({ mongoose.connection }),
    secret: config.get('jwtSecret'),
    resave: false,
    saveUninitialized: false
}))

const roomController = require('./controllers/Rooms')
const registerController = require('./controllers/Register')
const loginController = require('./controllers/Login')
const userController = require('./controllers/User')

app.use('/rooms', roomController)
app.use('/register', registerController)
app.use('/login', loginController)
app.use('/user', userController)


const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))