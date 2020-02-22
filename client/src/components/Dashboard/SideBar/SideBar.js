import React, { useState } from 'react'
import Room from './Room/Room'

import './SideBar.css'

function SideBar(props) {
    let [roomActive, setRoomActive] = useState()
    const button = props.list ? '- Hide Rooms' : '+ List Rooms'

    const handleListRooms = e => {
        e.preventDefault()
        if (props.list) {
            props.hideListRooms()
        } else {
            props.listRooms()
        }
    }

    const handleRoomActive = idx => {
        setRoomActive(idx)
    }

    const rooms = props.rooms
        ?   props.rooms.map((room, idx) => {
                return (
                    <Room 
                        room={room} 
                        roomUpdate={props.roomUpdate}
                        seenRoom={props.seenRoom}
                        key={idx} 
                        index={idx} 
                        isActive={roomActive} 
                        getRoomInfo={props.getRoomInfo} 
                        handleRoomActive={handleRoomActive} 
                    />
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