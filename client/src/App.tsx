import React, { useEffect } from 'react'
import { Camera } from './components/Camera'
import './App.css'
import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import DesktopNavbar from './components/Navbar/DesktopNavbar';

function App() {
    const navigate = useNavigate();
    const user: any = useLoaderData();

    useEffect(() => {
      if (user.token === null) {
        navigate('/login');
      } 
      
    }, [navigate, user.token])
  
  return (
    <div>
      {false && <Camera />}
      <DesktopNavbar />
      
      <Outlet />
    </div>
  )
}

export default App
