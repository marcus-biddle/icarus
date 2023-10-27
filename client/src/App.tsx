import React from 'react'
import { Camera } from './components/Camera'
import './App.css'
import { GoogleAuth } from './components/GoogleLogin/GoogleLogin';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      {false && <Camera />}
      <GoogleAuth />
      <Outlet />
    </div>
  )
}

export default App
