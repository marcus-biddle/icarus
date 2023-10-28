import React from 'react'
import { Camera } from './components/Camera'
import './App.css'
import { Outlet } from 'react-router-dom';
import DesktopNavbar from './components/Navbar/DesktopNavbar';

function App() {
  return (
    <div>
      {false && <Camera />}
      <DesktopNavbar />
      
      <Outlet />
    </div>
  )
}

export default App
