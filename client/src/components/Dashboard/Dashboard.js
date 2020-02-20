import React, { useState, useEffect } from 'react'
import axios from 'axios'

import SideBar from './SideBar/SideBar'
import Main from './Main/Main'

import './Dashboard.css'

function Dashboard(props) {
    let [rooms, setRooms] = useState([])

    const dataURL = 'http://localhost:4000/user'
    const header = {
        headers: {
            "x-auth-token": localStorage.token
        }
    }

    useEffect(() => {
        if (props.user) {
            axios.get(dataURL + '/rooms', header).then(res => {
                setRooms(res.data)
            })
        }
    }, [])

    const addRoom = () => {
        const room = { name: 'Testing room' }
        axios.post(dataURL + '/room', room, header).then(res => {
            setRooms(res.data.rooms)
        }).catch(err => console.log(err))
    }

    if (!props.user) props.history.push('/login')

    return (
        <div className='dash-container'>
            <SideBar rooms={rooms} addRoom={addRoom} />
            <Main />
        </div>
    )
}

export default Dashboard