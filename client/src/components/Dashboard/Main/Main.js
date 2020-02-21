import React, { useState, useEffect } from 'react'

import './Main.css'

function Main(props) {
    let [text, setText] = useState('')
    let [comment, setComment] = useState('')
    let [showCom, setShowCom] = useState()

    const data = props.display
    const list = props.list ? props.list : false
    let display = 'No Data'
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
                            <p>{comment.message}</p>
                        </div>
                    )
                })
                const displayComments = idx === showCom
                    ?   (
                            <div>
                                {comments}
                                <p className='hide-show' onClick={e => handleHideComments(e)}>Hide Comments</p>
                                <form onSubmit={e => handleCommentSubmit(e, post)}>
                                    <input type="text" id="comment" name="comment" value={comment} onChange={handleCommentChange} required />
                                    <button type='submit'>Reply</button>
                                </form>
                            </div>
                        )
                    :   <p className='hide-show' onClick={e => handleShowComments(e, idx)}>View Comments</p>
                return (
                    <div className='post'>
                        <h2>{post.user.name}</h2>
                        <h3>{post.message}</h3><span onClick={e => props.deletePost(post)}>Delete</span>
                        {displayComments}
                    </div>
                )
            })
            display = (
                <div className={displaySize}>
                    <h1>{data.room.name}</h1>
                    <h6>{data.room._id}</h6>
                    {posts ? posts : ''}
                    <form onSubmit={handlePostSubmit}>
                        <input type="text" id="post" name="post" value={text} onChange={handleTextChange} required />
                        <button type='submit'>New Post</button>
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

    return (
        <section className='main'>
            {roomList}
            {display}
        </section>
    )
}

export default Main