import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom'
import axios from 'axios'

import Header from './components/Header/Header'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Dashboard from './components/Dashboard/Dashboard'

function App() {
  let [data, setData] = useState()
  let [user, setUser] = useState()

  const dataURL = 'http://localhost:4000'

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

    axios.get(dataURL + '/register').then(res => {
      console.log(res)
    })
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
      <Header handleLogout={handleLogout} />
      <Route path='/login' render={props => <Login {...props} handleLogin={handleLogin} user={user} />} />
      <Route path='/register' render={props => <Register {...props} handleSignUp={handleSignUp} user={user} />} />
      <Route path='/dashboard' render={props => <Dashboard {...props} user={user} />} />
    </main>
  );
}

export default App;
