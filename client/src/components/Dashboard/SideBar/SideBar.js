import React, { useState } from 'react'
import Room from './Room/Room'

import './SideBar.css'

function SideBar(props) {
    // let [room, setRoom] = useState('')
    const button = props.list ? '- Hide List' : '+ List Rooms'

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
                    <Room room={room} key={idx} getRoomInfo={props.getRoomInfo} />
                    // {/* <button onClick={() => props.deleteRoom(room)}>Delete</button> */}
                )
            })
        :   ''

    return (
        <section className='sidebar'>
            <div className='title-side'>
                <h1 className='my-rooms'>My Rooms</h1>  
                <div className='add-room-container'><div className='add-room-button' onClick={props.showAddRoom}>+</div></div>    
            </div>
            <div className='side-rooms-container'>
                {rooms}
            </div>
            {/* <button onClick={props.showAddRoom}>New Room</button> */}
            {/* <form onSubmit={handleSubmit}>
                <input type='text' value={room} onChange={handleRoomChange} />
                <button type='submit'>Submit</button>
            </form> */}
            <h6 className='view-all-rooms' onClick={handleListRooms}>{button}</h6>
        </section>
    )
}

export default SideBar