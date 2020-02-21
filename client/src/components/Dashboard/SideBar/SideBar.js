import React, { useState } from 'react'
import Room from './Room/Room'

import './SideBar.css'

function SideBar(props) {
    let [room, setRoom] = useState('')

    const handleRoomChange = e => {
        e.preventDefault()
        setRoom(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        props.joinRoom(room)
        setRoom('')
    }

    const rooms = props.rooms
        ?   props.rooms.map((room, idx) => {
                return (
                    <div key={idx}>
                        <Room room={room} getRoomInfo={props.getRoomInfo} />
                        <button onClick={() => props.deleteRoom(room)}>Delete</button>
                    </div>
                )
            })
        :   ''

    return (
        <section className='sidebar'>
            <h1>From SideBar</h1>
            <div>
                {rooms}
            </div>
            <button onClick={props.showAddRoom}>New Room</button>
            <form onSubmit={handleSubmit}>
                <input type='text' value={room} onChange={handleRoomChange} />
                <button type='submit'>Submit</button>
            </form>
        </section>
    )
}

export default SideBar