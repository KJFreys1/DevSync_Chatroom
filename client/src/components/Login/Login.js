import React, { useState } from 'react'

import './Login.css'

function Login(props) {
    let [email, setEmail] = useState('')
    let [password, setPass] = useState('')

    const handleEmailChange = e => {
        e.preventDefault()
        setEmail(e.target.value)
    }

    const handlePassChange = e => {
        e.preventDefault()
        setPass(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        const user = {
            email,
            password
        }
        props.handleLogin(user)
    }

    if (props.user) props.history.push('/dashboard')

    return (
        <div className='login-inner-container'>
            <h1 className='login-title'>Log in to DevSync</h1>
            <form className='input-form' onSubmit={handleSubmit}>
                <div className='input-container-test'>
                    <label className='input-facade-test' for="email">Email</label><br />
                    <input autocomplete='off' className='input-test' type="email" id="email" name="email" value={email} onChange={handleEmailChange} required />
                </div>
                <div className='input-container-test'>
                    <label className='input-facade-test' for="password">Password</label><br />
                    <input className='input-test' type="password" id="password" name="password" value={password} onChange={handlePassChange} required />
                </div>
                <button className='login-button' type="submit">Login</button>
                <a className='redirect' href='/register'>Not a user? Sign up here</a>
            </form>
        </div>
    )
}

export default Login