import React from 'react'

import './Room.css'

function Room(props) {
    return(
        <div className='bar' onClick={() => props.getRoomInfo(props.room)}>
            <span></span><h3 className='side-single-container'>{props.room.name}</h3>
        </div>
    )
}

export default Room