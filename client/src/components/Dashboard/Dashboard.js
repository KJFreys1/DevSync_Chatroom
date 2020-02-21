import React, { useState, useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

import SideBar from './SideBar/SideBar'
import Main from './Main/Main'
import AddRoom from './Modal/AddRoom'

import './Dashboard.css'

let socket

function Dashboard(props) {
    let [rooms, setRooms] = useState([])
    let [display, setDisplay] = useState({room: {name: null}})
    let [addRoomDisplay, setAddRoomDisplay] = useState('hidden')

    const roomURL = 'http://localhost:4000/rooms'
    const dataURL = 'http://localhost:4000/user'
    const header = {
        headers: {
            "x-auth-token": localStorage.token
        }
    }

    const ENDPOINT = 'http://localhost:4000'
    const name = props.user ? props.user.name : null
    
    useEffect(() => {
        getAllRooms()
    }, [])

    useEffect(() => {
        socket = io(ENDPOINT)
        if (display.type == 'room') {
            socket.emit('join', { name, room: display.room }, (error) => {
                if (error) alert(error)
            })
        }
    }, [ENDPOINT, display.room.name])

    useEffect(() => {
        socket.on('updatePost', room => {
            getRoomInfo(room)
        })

        return () => {
            socket.emit('disconnect')

            socket.off()
        }
    }, [display.posts])

    const getAllRooms = () => {
        if (props.user) {
            axios.get(dataURL + '/rooms', header).then(res => {
                setRooms(res.data)
            })
        }
    }

    const showAddRoom = () => {
        setAddRoomDisplay('show')
    }

    const hideAddRoom = () => {
        setAddRoomDisplay('hidden')
    }

    const addRoom = (name, description) => {
        const room = { name, description }
        axios.post(dataURL + '/room', room, header).then(res => {
            setRooms(res.data.rooms)
            getRoomInfo(res.data.rooms[res.data.rooms.length - 1])
            hideAddRoom()
        }).catch(err => console.log(err))
    }

    const deleteRoom = room => {
        axios.delete(dataURL + '/room/' + room._id, header)
        const newRooms = [...rooms]
        newRooms.splice(rooms.indexOf(room), 1)
        setRooms(newRooms)
        if (display.room === room) {
            setDisplay({}) 
        }
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
            socket.emit('sendPost', display.room)
        })
    }

    const deletePost = (post) => {
        axios.delete(dataURL + '/post/' + post._id, header)
        const data = {...display}
        data.posts.splice(data.posts.indexOf(post), 1)
        setDisplay(data)
        socket.emit('sendPost', display.room)
    }

    const addComment = (post, text) => {
        const comment = { message: text }
        axios.post(dataURL + '/comment/' + post._id, comment, header)
        const data = {...display}
        const newPost = {...post}
        newPost.comments.push(comment)
        data.posts.splice(data.posts.indexOf(post), 1, newPost)
        setDisplay(data)
        socket.emit('sendPost', display.room)
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
                <SideBar rooms={rooms} showAddRoom={showAddRoom} getRoomInfo={getRoomInfo} deleteRoom={deleteRoom} />
                <Main display={display} createPost={createPost} deletePost={deletePost} addComment={addComment} />
            </div>
        </div>
    )
}

export default Dashboard