import React, { useState } from 'react'
import Room from './Room/Room'

import './SideBar.css'

function SideBar(props) {
    // let [room, setRoom] = useState('')
    const button = props.list ? 'Hide List' : 'List Rooms'

    // const handleRoomChange = e => {
    //     e.preventDefault()
    //     setRoom(e.target.value)
    // }

    // const handleSubmit = e => {
    //     e.preventDefault()
    //     props.joinRoom(room)
    //     setRoom('')
    // }

    const handleListRooms = e => {
        e.preventDefault()
        if (props.list) {
            props.hideListRooms()
        } else {
            props.listRooms()
        }
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
            <h1>My Rooms</h1>
            <button onClick={handleListRooms}>{button}</button>
            <div>
                {rooms}
            </div>
            <button onClick={props.showAddRoom}>New Room</button>
            {/* <form onSubmit={handleSubmit}>
                <input type='text' value={room} onChange={handleRoomChange} />
                <button type='submit'>Submit</button>
            </form> */}
        </section>
    )
}

export default SideBar