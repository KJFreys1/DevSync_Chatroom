import React, { useState } from 'react'

import './Main.css'

function Main(props) {
    let [text, setText] = useState('')
    let [comment, setComment] = useState('')

    const data = props.display
    let display = 'No Data'

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
    }

    const handleCommentSubmit = (e, post) => {
        e.preventDefault()
        props.addComment(post, comment)
        setText('')
        setComment('')
    }

    if (data) {
        if (data.type == 'room') {
            const posts = data.posts.map(post => {
                return (
                    <div>
                        <h2>{post.user.name}</h2>
                        <p>{post.message}</p>
                        <p>COMMENTS</p>
                        {post.comments.map(comment => {
                            return <p>{comment.message}</p>
                        })}
                        <form onSubmit={e => handleCommentSubmit(e, post)}>
                            <input type="text" id="comment" name="comment" value={comment} onChange={handleCommentChange} required />
                            <button type='submit'>Reply</button>
                        </form>
                    </div>
                )
            })
            display = (
                <div>
                    <h1>{data.room.name}</h1>
                    {posts ? posts : ''}
                    <form onSubmit={handlePostSubmit}>
                        <input type="text" id="post" name="post" value={text} onChange={handleTextChange} required />
                        <button type='submit'>New Post</button>
                    </form>
                </div>
            )
        }
    }

    return (
        <section className='main'>
            {display}
        </section>
    )
}

export default Main