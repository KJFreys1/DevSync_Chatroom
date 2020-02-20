import React from 'react'

function Header(props) {
    return (
        <header style={{backgroundColor: 'lightblue'}}>
            <h1 style={{display: 'inline-block'}}>Chatroom</h1><span style={{float: 'right'}} onClick={props.handleLogout}>User Info</span>
        </header>
    )
}

export default Header