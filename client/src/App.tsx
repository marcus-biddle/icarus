import React, { useEffect } from 'react'
import { Camera } from './components/Camera'
import './App.css'
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import TopMobileNavbar from './components/Navbar/TopMobileNavbar';

function App() {
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user: any = useLoaderData();

    useEffect(() => {
      // if (user.token === null) {
      //   navigate('/login');
      // } 
      
    }, [navigate, user.token])
  
  return (
    <div style={{ position: 'relative', maxHeight: '100vh' }}>
      {false && <Camera />}
      <TopMobileNavbar />
      
      <div style={{ zIndex: '1', minHeight: '94vh', position: 'relative', backgroundColor: '#0d1118'}}>
      <Outlet />
      </div>
      
      {/* <Show when={isMobile}>
        <MobileNavbar />
      </Show> */}
    </div>
  )
}

export default App
