import React from 'react';
import { Route } from 'react-router-dom'

import Header from './components/Header/Header'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Dashboard from './components/Dashboard/Dashboard'

function App() {
  return (
    <main>
      <Header />
      <Route path='/login' render={() => <Login />} />
      <Route path='/register' render={() => <Register />} />
      <Route path='/dashboard' render={() => <Dashboard />} />
    </main>
  );
}

export default App;
