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
    let [roomUpdate, setRoomUpdate] = useState([])
    let [display, setDisplay] = useState({room: {name: null}})
    let [addRoomDisplay, setAddRoomDisplay] = useState('hidden')
    let [list, setList] = useState('')

    const roomURL = 'https://capstone-proj-slack.herokuapp.com/rooms'
    const dataURL = 'https://capstone-proj-slack.herokuapp.com/user'
    const header = {
        headers: {
            "x-auth-token": localStorage.token
        }
    }

    const ENDPOINT = 'https://capstone-proj-slack.herokuapp.com'
    const name = props.user ? props.user.name : null
    
    useEffect(() => {
        getAllRooms(true)
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
            if (room._id === display.room._id) {
                getRoomInfo(room)
            } else {
                const updatedRooms = [...roomUpdate]
                updatedRooms.push(room._id)
                setRoomUpdate(updatedRooms)
            }
        })

        return () => {
            socket.emit('disconnect')

            socket.off()
        }
    }, [display.posts])

    const seenRoom = rid => {
        const updatedRooms = [...roomUpdate]
        updatedRooms.splice(updatedRooms.indexOf(rid), 1)
        setRoomUpdate(updatedRooms)
    }

    const getAllRooms = () => {
        if (props.user) {
            axios.get(dataURL + '/rooms', header).then(res => {
                setRooms(res.data)
            })
        }
    }

    const listRooms = () => {
        axios.get(roomURL).then(res => {
            setList(res.data)
        })
    }

    const hideListRooms = () => {
        setList('')
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

    const joinRoom = room => {
        const rid = room._id
        if (props.user.rooms_active.includes(rid)) return console.log('room exists')
        axios.put(dataURL + '/room/' + rid, rid, header).then(res => {
            getAllRooms()
            getRoomInfo(room)
            setList('')
        })
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

    const createPost = (room, text) => {
        const post = { message: text }
        const tempPost = {
            message: text,
            user: props.user,
            comments: []
        }
        const data = {...display}
        data.posts.push(tempPost)
        setDisplay(data)
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
        axios.post(dataURL + '/comment/' + post._id, comment, header).then(() => {
            socket.emit('sendPost', display.room)
        })
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
                <SideBar 
                    rooms={rooms} 
                    roomUpdate={roomUpdate}
                    seenRoom={seenRoom}
                    showAddRoom={showAddRoom} 
                    joinRoom={joinRoom} 
                    getRoomInfo={getRoomInfo} 
                    deleteRoom={deleteRoom} 
                    list={list}
                    listRooms={listRooms}
                    hideListRooms={hideListRooms}
                />
                <Main 
                    display={display} 
                    list={list}
                    joinRoom={joinRoom}
                    createPost={createPost} 
                    deletePost={deletePost} 
                    addComment={addComment} 
                />
            </div>
        </div>
    )
}

export default Dashboard