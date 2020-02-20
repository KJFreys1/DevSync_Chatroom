import React, { useState } from 'react'

import './AddRoom.css'

function AddRoom(props) {
    let [name, setName] = useState('')
    let [desc, setDesc] = useState('')

    const handleNameChange = e => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleDescChange = e => {
        e.preventDefault()
        setDesc(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        props.addRoom(name, desc)
        setName('')
        setDesc('')
    }

    return (
        <div className={`modal-container ${props.display}`}>
            <div className='modal-textbox'>
                <form onSubmit={handleSubmit}>
                    <label for="room-name">Room Name</label><br />
                    <input type="text" id="room-name" name="room-name" value={name} onChange={handleNameChange} required /><br />
                    <label for="room-desc">Description</label><br />
                    <input type="text" id="room-desc" name="room-desc" value={desc} onChange={handleDescChange} required /><br />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddRoom