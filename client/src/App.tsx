import React, { useEffect } from 'react'
import { Camera } from './components/Camera'
import './App.css'
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { useIsMobile } from './utilities/hooks/useIsMobile'
import DesktopNavbar from './components/Navbar/DesktopNavbar';
import { Show } from './helpers/functional';
import MobileNavbar from './components/Navbar/MobileNavbar';
import TopMobileNavbar from './components/Navbar/TopMobileNavbar';

function App() {
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user: any = useLoaderData();
    const isMobile = useIsMobile();

    useEffect(() => {
      // if (user.token === null) {
      //   navigate('/login');
      // } 
      
    }, [navigate, user.token])
  
  return (
    <div style={{ position: 'relative', maxHeight: '100vh' }}>
      {false && <Camera />}
      <Show when={!isMobile}>
        <DesktopNavbar />
      </Show>
      <Show when={isMobile}>
        <TopMobileNavbar />
      </Show>
      
      <div style={{ zIndex: '1', height: '94vh', backgroundColor: 'grey', position: 'relative'}}>
      <Outlet />
      </div>
      
      <Show when={isMobile}>
        <MobileNavbar />
      </Show>
    </div>
  )
}

export default App
