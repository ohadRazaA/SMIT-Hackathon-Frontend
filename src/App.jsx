import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/User/Dashboard'
import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/Login'
import Protected from './Protected'

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Login />} />
        <Route path='/signup' element={<Signup />} />


        <Route element={<Protected />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        
      </Routes>
    </div>
  )
}

export default App