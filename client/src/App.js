import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom'
import axios from 'axios'

import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Dashboard from './components/Dashboard/Dashboard'

function App() {
  let [user, setUser] = useState()

  const dataURL = 'https://capstone-proj-slack.herokuapp.com'
  const lobby = '5e555f98f158be5c58f1742f'

  useEffect(() => {
    if (localStorage.token) {
      axios.get(dataURL + '/login/user', {
        headers: {
          "x-auth-token": localStorage.token
        }
      }).then(res => {
        setUser(res.data)
      })
    }
  }, [])

  const handleLogin = user => {
    axios.post(dataURL + '/login', user)
      .then(res => {
        localStorage.token = res.data.token
        setUser(res.data.user)
      }).catch(err => console.log(err))
  }

  const handleSignUp = user => {
    axios.post(dataURL + '/register', user)
      .then(res => {
        localStorage.token = res.data.token
        setUser(res.data.user)
      }).catch(err => console.log(err))
  }

  const handleLogout = () => {
    localStorage.clear()
    setUser()
  }

  return (
    <main>
      <Route path='/' exact render={() => <Redirect to='/login' /> } />
      <Route path='/login' render={props => <Login {...props} handleLogin={handleLogin} user={user} />} />
      <Route path='/register' render={props => <Register {...props} handleLogout={handleLogout} handleSignUp={handleSignUp} user={user} />} />
      <Route path='/dashboard' render={props => <Dashboard {...props} lobby={lobby} handleLogout={handleLogout} user={user} />} />
    </main>
  );
}

export default App;
