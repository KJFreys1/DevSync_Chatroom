import React, { useState } from 'react'

function Register(props) {
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPass] = useState('')
    let [confirm, setConfirm] = useState('')

    const handleNameChange = e => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleEmailChange = e => {
        e.preventDefault()
        setEmail(e.target.value)
    }

    const handlePassChange = e => {
        e.preventDefault()
        setPass(e.target.value)
    }

    const handleConfirmChange = e => {
        e.preventDefault()
        setConfirm(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (password === confirm) {
            const user = {
                name,
                email,
                password
            }
            props.handleSignUp(user)
        } else {
            alert('passwords do no match')
        }
    }

    if (props.user) props.history.push('/dashboard')

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" value={name} onChange={handleNameChange} required />
                </div>
                <div>
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} required />
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" value={password} onChange={handlePassChange} required />
                </div>
                <div>
                    <label for="confirm">Confirm Password</label>
                    <input type="password" id="confirm" name="confirm" value={confirm} onChange={handleConfirmChange} required />
                </div>
                <button type="submit">Register</button>
            </form>
            <a href='/login'>Login</a>
        </div>
    )
}

export default Register