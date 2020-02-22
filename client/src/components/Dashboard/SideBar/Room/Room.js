import React from 'react'

import './Room.css'

function Room(props) {
    const handleClick = () => {
        props.getRoomInfo(props.room)
        props.handleRoomActive(props.index)
    }

    const focus = props.isActive === props.index ? 'bar-active' : ''

    return(
        <div className={`bar ${focus}`} onClick={handleClick}>
            <span></span><h3 className='side-single-container'>{props.room.name}</h3>
        </div>
    )
}

export default Room