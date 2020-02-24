import React from 'react'
import Room from './Room/Room'

import './SideBar.css'

function SideBar(props) {
    const button = props.list ? '- Hide Rooms' : '+ List Rooms'

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
                    <Room 
                        room={room} 
                        roomUpdate={props.roomUpdate}
                        seenRoom={props.seenRoom}
                        key={idx} 
                        index={idx} 
                        isActive={props.roomActive} 
                        getRoomInfo={props.getRoomInfo} 
                        handleRoomActive={props.handleRoomActive} 
                    />
                )
            })
        :   ''

    return (
        <section className='sidebar'>
            <div className='header'>
                <h1 className='devsync-title'>DevSync</h1>
                <h2 className='header-greeting'>@{props.name}<span className='logout' onClick={props.handleLogout}>Log out</span></h2>
            </div>
            <div className='title-side'>
                <h1 className='my-rooms'>My Rooms<div className='add-room-button' onClick={props.showAddRoom}>+</div></h1>  
                {/* <div className='add-room-button' onClick={props.showAddRoom}>+</div>   */}
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