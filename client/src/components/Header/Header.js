import React from 'react'

function Header() {
    return (
        <header style={{backgroundColor: 'lightblue'}}>
            <h1 style={{display: 'inline-block'}}>Chatroom</h1><span style={{float: 'right'}}>User Info</span>
        </header>
    )
}

export default Header