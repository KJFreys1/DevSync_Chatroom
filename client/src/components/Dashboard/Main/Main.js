import React from 'react'

import './Main.css'

function Main(props) {
    const data = props.display
    let display = 'No Data'

    console.log('here')
    console.log(data.posts)
    if (data) {
        if (data.type == 'room') {
            const posts = data.posts.map(post => {
                console.log(post)
                return (
                    <div>
                        <h2>{post.user.name}</h2>
                        <p>{post.message}</p>
                        <p>COMMENTS</p>
                        {post.comments.map(comment => {
                            return <p>{comment.message}</p>
                        })}
                        <button onClick={() => props.addComment(post)}>Add Comment</button>
                    </div>
                )
            })
            display = (
                <div>
                    <h1>{data.room.name}</h1>
                    {posts ? posts : ''}
                    <button onClick={() => props.createPost(data.room)}>New Post</button>
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