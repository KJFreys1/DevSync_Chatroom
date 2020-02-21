import React from 'react'
import Room from './Room/Room'

import './SideBar.css'

function SideBar(props) {
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
        </section>
    )
}

export default SideBar