import React from 'react'

function Room(props) {
    return(
        <div onClick={() => props.getRoomInfo(props.room)}>{props.room.name}</div>
    )
}

export default Room