import React, { useEffect } from 'react'
import { Camera } from './components/Camera'
import './App.css'
import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import TopNavbar from './components/Navigation/TopNavbar';
import { Show } from './helpers/functional';
import { LandingPageNav } from './components/Navigation/LandingPageNav';

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const isLandingPage = location.pathname === '/';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user: any = useLoaderData();

    useEffect(() => {
      if (user.token === null && location.pathname !== '/') {
        navigate('/');
      } 
      
    }, [navigate, user.token])
  
  return (
    <div className='body-format'>
      {/* {false && <Camera />} */}
      
      <Show when={!isLandingPage}>
        <TopNavbar />
      </Show>

      <Show when={isLandingPage}>
        <LandingPageNav />
      </Show>
      
      <div style={{ zIndex: '1', minHeight: '94vh', position: 'relative', }}>
        <Outlet />
      </div>
      
    </div>
  )
}

export default App
