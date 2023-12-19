import React, { useEffect } from 'react'
import { Camera } from './components/Camera'
import './App.css'
import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import TopNavbar from './components/Navigation/TopNavbar';
import { useAuthCheck } from './utilities/hooks/useAuthCheck';
import LandingPageLayout from './layouts/LandingPage/LandingPageLayout';

function App() {
  const auth = useAuthCheck();

  return (
    <>
      <div className='body-format'>
        {/* {false && <Camera />} */}

          <TopNavbar />
        
        <div style={{ zIndex: '1', position: 'relative', minHeight: '120vh'}}>
          {auth ? <Outlet /> : <LandingPageLayout />}
        </div>
        
      </div>

      <div style={{ backgroundColor: '#121827', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <footer className='footer-container'>
          
        </footer>
      </div>
      
    </>
    
  )
}

export default App
