import React, { useState } from 'react'

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
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} required />
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" value={password} onChange={handlePassChange} required />
                 </div>
                <button type="submit">Login</button>
            </form>
            <a href='/register'>Register</a>
        </div>
    )
}
            
export default Login