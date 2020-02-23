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
        <div className='login-inner-container'>
            <h1 className='login-title'>Register for Dev Sync</h1>
            <form className='input-form' autocomplete='off' onSubmit={handleSubmit}>
                <div className='input-container-test'>
                    <label className='input-facade-test' for="name">Name</label>
                    <input type="text" autocomplete="off" className='input-test' id="name" name="name" value={name} onChange={handleNameChange} required />
                </div>
                <div className='input-container-test'>
                    <label className='input-facade-test' for="email">Email</label>
                    <input autocomplete='off' className='input-test' type="email" id="email" name="email" value={email} onChange={handleEmailChange} required />
                </div>
                <div className='input-container-test'>
                    <label className='input-facade-test' for="password">Password</label>
                    <input className='input-test' type="password" id="password" name="password" value={password} onChange={handlePassChange} required />
                </div>
                <div className='input-container-test'>
                    <label className='input-facade-test' for="confirm">Confirm Password</label>
                    <input className='input-test' type="password" id="confirm" name="confirm" value={confirm} onChange={handleConfirmChange} required />
                </div>
                <button className='login-button' type="submit">Create My Account</button>
                <a className='redirect' href='/login'>Already a user? Sign in here</a>
            </form>
        </div>
    )
}

export default Register