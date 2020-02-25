import React, { useState, useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

import '../Header/Header.css'
import SideBar from './SideBar/SideBar'
import Main from './Main/Main'
import AddRoom from './Modal/AddRoom'

import './Dashboard.css'

let socket

function Dashboard(props) {
    let [rooms, setRooms] = useState([])
    let [roomActive, setRoomActive] = useState()
    let [roomUpdate, setRoomUpdate] = useState([])
    let [display, setDisplay] = useState({ room: { name: null } })
    let [addRoomDisplay, setAddRoomDisplay] = useState('hide-modal')
    let [list, setList] = useState('')

    const roomURL = 'https://capstone-proj-slack.herokuapp.com/rooms'
    const dataURL = 'https://capstone-proj-slack.herokuapp.com/user'
    const header = {
        headers: {
            "x-auth-token": localStorage.token,
            "Access-Control-Allow-Origin": "*",
        }
    }

    const ENDPOINT = 'https://capstone-proj-slack.herokuapp.com'
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
                if (res.data.length === 0) {
                    joinRoom( { _id: props.lobby } )
                }
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
        setAddRoomDisplay('show-modal')
    }

    const hideAddRoom = () => {
        setAddRoomDisplay('hide-modal')
    }

    const addRoom = (name, description) => {
        const room = { name, description }
        axios.post(dataURL + '/room', room, header).then(res => {
            setRooms(res.data.rooms)
            getRoomInfo(res.data.rooms[res.data.rooms.length - 1])
            handleRoomActive(res.data.rooms.length - 1)
            hideAddRoom()
        }).catch(err => console.log(err))
    }

    const joinRoom = room => {
        const rid = room._id
        axios.put(dataURL + '/room/' + rid, rid, header).then(() => {
            getAllRooms()
            getRoomInfo(room)
            setList('')
        })
    }

    const leaveRoom = room => {
        const rid = room._id
        axios.put(dataURL + '/room/leave/' + rid, rid, header).then(() => {
            getAllRooms()
            const selectedRoom = rooms.filter(rm => rm._id === room._id)
            const indexRoom = rooms.indexOf(selectedRoom[0]) - 1
            if (indexRoom === -1 && rooms.length > 1) {
                getRoomInfo(rooms[1], true)
            } else if (indexRoom === -1) {
                getRoomInfo( {name: null} )
            } else {
                getRoomInfo(rooms[indexRoom])
            }
        })
    }

    // Used for admin/testing purposes only
    // const deleteRoom = room => {
    //     axios.delete(dataURL + '/room/' + room._id, header)
    //     const newRooms = [...rooms]
    //     newRooms.splice(rooms.indexOf(room), 1)
    //     setRooms(newRooms)
    //     if (display.room === room) {
    //         setDisplay({})
    //     }
    // }

    const createPost = (room, text) => {
        const post = { message: text }
        const tempPost = {
            message: text,
            user: props.user,
            comments: []
        }
        const data = { ...display }
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
        const data = { ...display }
        data.posts.splice(data.posts.indexOf(post), 1)
        setDisplay(data)
        socket.emit('sendPost', display.room)
    }

    const addComment = (post, text) => {
        const comment = { message: text }
        axios.post(dataURL + '/comment/' + post._id, comment, header).then(() => {
            socket.emit('sendPost', display.room)
        }).catch(err => console.log(err))
        const data = { ...display }
        const newPost = { ...post }
        const newComment = { ...comment }
        newComment.user = { name }
        newPost.comments.push(newComment)
        data.posts.splice(data.posts.indexOf(post), 1, newPost)
        setDisplay(data)
    }

    const getRoomInfo = (room, deleted) => {
        axios.get(roomURL + '/id/' + room._id).then(res => {
            const data = {
                room,
                posts: res.data,
                type: 'room'
            }
            setDisplay(data)
            const selectedRoom = rooms.filter(rm => rm._id === room._id)
            const indexRoom = rooms.indexOf(selectedRoom[0])
            if (indexRoom != -1 && !deleted) {
                setRoomActive(indexRoom)
            } else if (indexRoom != -1) {
                setRoomActive(0)
            }
            else {
                setRoomActive(rooms.length)
            }
        })
    }

    const handleRoomActive = idx => {
        setRoomActive(idx)
    }

    if (!props.user) props.history.push('/login')

    return (
        <div className='full-dash'>
            <AddRoom
                display={addRoomDisplay}
                addRoom={addRoom}
                hideAddRoom={hideAddRoom}
            />
            <div className='dash-container'>
                <SideBar
                    rooms={rooms}
                    roomUpdate={roomUpdate}
                    seenRoom={seenRoom}
                    showAddRoom={showAddRoom}
                    joinRoom={joinRoom}
                    getRoomInfo={getRoomInfo}
                    list={list}
                    listRooms={listRooms}
                    hideListRooms={hideListRooms}
                    handleLogout={props.handleLogout}
                    name={name}
                    roomActive={roomActive}
                    handleRoomActive={handleRoomActive}
                />
                <Main
                    display={display}
                    list={list}
                    joinRoom={joinRoom}
                    leaveRoom={leaveRoom}
                    createPost={createPost}
                    deletePost={deletePost}
                    addComment={addComment}
                    name={name}
                // roomsActive={roomsActive}
                />
            </div>
        </div>
    )
}

export default Dashboard