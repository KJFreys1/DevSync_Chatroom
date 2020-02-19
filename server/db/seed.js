const Room = require('../models/Room')

Room.deleteMany({}).then(createData)

function createData() {
    Room.create({
        name: 'Room Test'
    })
    .then(room => room.save())
    .then(() => console.log('created room'))
}