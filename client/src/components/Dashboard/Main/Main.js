import React, { useState, useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

import './Main.css'

function Main(props) {
    let [text, setText] = useState('')
    let [comment, setComment] = useState('')
    let [showCom, setShowCom] = useState()

    const data = props.display
    const list = props.list ? props.list : false
    let display = ''
    let roomList = ''

    useEffect(() => {
        setShowCom()
    }, [props.display.room])

    const handleTextChange = e => {
        e.preventDefault()
        setText(e.target.value)
    }

    const handleCommentChange = e => {
        e.preventDefault()
        setComment(e.target.value)
    }

    const handlePostSubmit = e => {
        e.preventDefault()
        props.createPost(data.room, text)
        setText('')
        setComment('')
        setShowCom()
    }

    const handleCommentSubmit = (e, post) => {
        e.preventDefault()
        props.addComment(post, comment)
        setText('')
        setComment('')
    }

    const handleShowComments = (e, idx) => {
        e.preventDefault()
        setShowCom(idx)
    }

    const handleHideComments = (e) => {
        e.preventDefault()
        setShowCom()
        setComment('')
    }

    const handleJoinRoom = (e, room) => {
        e.preventDefault()
        props.joinRoom(room)
    }

    if (data) {
        if (data.type === 'room') {
            const displaySize = list ? 'partial-view' : 'full-view'
            const posts = data.posts.map((post, idx) => {
                const comments = post.comments.map(comment => {
                    return (
                        <div key={idx}>
                            <p className='comment-single'>@{comment.user.name}</p>
                            <p className='comment-single'>{comment.message}</p>
                        </div>
                    )
                })
                const displayComments = idx === showCom
                    ? (
                        <div className='comments-container'>
                            {comments}
                            <form onSubmit={e => handleCommentSubmit(e, post)}>
                                <textarea placeholder='Type your message here...' className='comment-textbox' type="text" id="comment" name="comment" value={comment} onChange={handleCommentChange} required /><br />
                                <div className='com-button-container'>
                                    <button className='send-button' type='submit'>Reply</button>
                                    <p className='hide' onClick={e => handleHideComments(e)}>Hide Comments</p>
                                </div>
                            </form>
                        </div>
                    )
                    : <p className='show' onClick={e => handleShowComments(e, idx)}>View Comments</p>
                return (
                    <div className='post-container'>
                        <h2 className='post-username'>@{post.user.name}</h2>
                        <h3 className='post-message'>{post.message}</h3>
                        {displayComments}
                    </div>
                )
            })
            display = (
                <div className={`display-container ${displaySize}`}>
                    <div className='main-header-container'>
                        <h1 className='main-header-title'>{data.room.name}</h1>
                        <h6 className='main-header-desc'>{data.room.description}</h6>
                    </div>
                    <ScrollToBottom className='content'>
                        {posts ? posts : ''}
                    </ScrollToBottom>
                    <form className='post-form' onSubmit={handlePostSubmit}>
                        <textarea placeholder='Type your post here...' className='post-textbox' type="text" id="post" name="post" value={text} onChange={handleTextChange} required />
                        <button className='post-button' type='submit'>New Post</button>
                    </form>
                </div>
            )
        }
        if (list) {
            roomList = (
                <div className='listed-rooms-container'>
                    <h1 className='title-list'>All Rooms</h1>
                    <div className='listed-room'>
                        {list.map(room => (
                            <div className='list-bar' onClick={e => handleJoinRoom(e, room)}>
                                <span></span><h3 className='list-single-container'>{room.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            )

        }
    }

    if (!display) {
        display = (
            <div className='default-view-container'>
                <h1>Hello, {props.name}, and welcome to DevSync, a hub for instant communication between developers.</h1>
            </div>
        )
    }

    return (
        <section className='main'>
            {roomList}
            {display}
        </section>
    )
}

export default Main