import React from 'react'

import './Header.css'

function Header(props) {
    return (
        <header className='header'>
            <h1 className='devsync-title'>DevSync</h1>
            <h2 className='header-greeting'>Welcome, {props.name}<span className='logout' onClick={props.handleLogout}>Log out</span></h2>
        </header>
    )
}

export default Header