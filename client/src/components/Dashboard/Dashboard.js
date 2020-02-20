import React, { useState, useEffect } from 'react'
import axios from 'axios'

import SideBar from './SideBar/SideBar'
import Main from './Main/Main'
import AddRoom from './Modal/AddRoom'

import './Dashboard.css'

function Dashboard(props) {
    let [rooms, setRooms] = useState([])
    let [display, setDisplay] = useState({})
    let [addRoomDisplay, setAddRoomDisplay] = useState('hidden')

    const roomURL = 'http://localhost:4000/rooms'
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

    const showAddRoom = () => {
        setAddRoomDisplay('show')
    }

    const hideAddRoom = () => {
        setAddRoomDisplay('hidden')
    }

    //Needs refractor
    const addRoom = (name, description) => {
        const room = { name, description }
        axios.post(dataURL + '/room', room, header).then(res => {
            setRooms(res.data.rooms)
        }).catch(err => console.log(err))
        hideAddRoom()
    }

    //Needs refractor
    const createPost = (room, text) => {
        const post = { message: text }
        axios.post(dataURL + '/post/' + room._id, post, header).then(res => {
            const data = {
                room,
                posts: res.data.posts,
                type: 'room'
            }
            setDisplay(data)
        })
    }

    const addComment = (post, text) => {
        const comment = { message: text }
        axios.post(dataURL + '/comment/' + post._id, comment, header)
        const data = {...display}
        const newPost = {...post}
        newPost.comments.push(comment)
        data.posts.splice(data.posts.indexOf(post), 1, newPost)
        setDisplay(data)
    }

    const getRoomInfo = room => {
        axios.get(roomURL + '/id/' + room._id).then(res => {
            const data = {
                room,
                posts: res.data,
                type: 'room'
            }
            setDisplay(data)
        })
    }

    if (!props.user) props.history.push('/login')

    return (
        <div className='full-dash'>
            <AddRoom display={addRoomDisplay} addRoom={addRoom} />
            <div className='dash-container'>
                <SideBar rooms={rooms} showAddRoom={showAddRoom} getRoomInfo={getRoomInfo} />
                <Main display={display} createPost={createPost} addComment={addComment} />
            </div>
        </div>
    )
}

export default Dashboard