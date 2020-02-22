import React from 'react'

import './Room.css'

function Room(props) {
    const handleClick = () => {
        if (isSeen) {
            props.seenRoom(props.room._id)
        }
        props.getRoomInfo(props.room)
        props.handleRoomActive(props.index)
    }

    const focus = props.isActive === props.index ? 'bar-active' : ''
    const isSeen = props.roomUpdate.includes(props.room._id) ? 'bar-unseen' : ''

    return(
        <div className={`bar ${focus} ${isSeen}`} onClick={handleClick}>
            <span></span><h3 className='side-single-container'>{props.room.name}</h3>
        </div>
    )
}

export default Room