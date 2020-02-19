import React from 'react'

import SideBar from './SideBar/SideBar'
import Main from './Main/Main'

import './Dashboard.css'

function Dashboard() {
    return (
        <div className='dash-container'>
            <SideBar />
            <Main />
        </div>
    )
}

export default Dashboard