import React, { useState } from 'react'

import './AddRoom.css'

function AddRoom(props) {
    let [room, setRoom] = useState('')
    let [desc, setDesc] = useState('')

    const handleRoomChange = e => {
        e.preventDefault()
        setRoom(e.target.value)
    }

    const handleDescChange = e => {
        e.preventDefault()
        setDesc(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        props.addRoom(room, desc)
        setRoom('')
        setDesc('')
    }

    const handleCloseModal = e => {
        e.preventDefault()
        props.hideAddRoom()
        setRoom('')
        setDesc('')
    }

    return (
        <div className={`modal-container ${props.display}`}>
            <div className='modal-textbox'>
                <form onSubmit={handleSubmit}>
                    <div className='close-modal-container'>
                        <span className='close-modal' onClick={handleCloseModal}>X</span>
                    </div>
                    <div className='input-container-test'>
                        <label className='input-facade-test' for="room">Enter the name of your room</label><br />
                        <input autocomplete='off' className='input-test' type="room" id="room" name="room" value={room} onChange={handleRoomChange} required />
                    </div>
                    <div className='input-container-test'>
                        <label className='input-facade-test' for="room-desc">Write a short description for you room</label><br />
                        <input autocomplete='off' className='input-test' type="text" id="room-desc" name="room-desc" value={desc} onChange={handleDescChange} required />
                    </div>
                    <button className='room-button' type="submit">Submit</button>
                    {/* <label for="room-name">Room Name</label><br />
                    <input type="text" id="room-name" name="room-name" value={name} onChange={handleNameChange} required /><br />
                    <label for="room-desc">Description</label><br />
                    <input type="text" id="room-desc" name="room-desc" value={desc} onChange={handleDescChange} required /><br /> */}
                    {/* <button type='submit'>Submit</button> */}
                </form>
            </div>
        </div>
    )
}

export default AddRoom