import React from 'react'
import Room from './Room/Room'

import './SideBar.css'

function SideBar(props) {
    const rooms = props.rooms
        ?   props.rooms.map(room => {
                return <div><Room room={room} /></div>
            })
        :   ''
    console.log(props.rooms)
    return (
        <section className='sidebar'>
            <h1>From SideBar</h1>
            <div>
                {rooms}
            </div>
            <button onClick={props.addRoom}>New Room</button>
        </section>
    )
}

export default SideBar