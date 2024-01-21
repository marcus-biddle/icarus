import React, { useEffect } from 'react'
import { Camera } from './components/Camera'
import './App.css'
import { Outlet, redirect, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import TopNavbar from './components/Navigation/TopNavbar';
import { useAuthCheck } from './utilities/hooks/useAuthCheck';
import LandingPageLayout from './layouts/LandingPage/LandingPageLayout';
import BottomNav from './components/Navigation/Bottom/BottomNav';
import SideNav from './components/Navigation/SideNav/SideNav';
import { useIsMobile } from './utilities/hooks/useIsMobile';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { UserState } from './features/user/userSlice';

function App() {
  const auth = useAuthCheck();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile({});
  const creationDate = useSelector((state: UserState) => state?.currentUser?.creationDate)
  const user = useSelector((state: UserState) => state?.currentUser);

  useEffect(() => {
    if (!creationDate) {
      navigate('duo/login')
    }
    console.log('User -App.tsx', user);
  }, [location.pathname, creationDate])

  return (
    <>
      <div style={{ display: 'flex', color: 'white', backgroundColor: '#121827'}}>
        {/* {false && <Camera />} */}

        {/* {!location.pathname.includes('duo') && <TopNavbar />} */}
        {!isMobile && !location.pathname.includes('login') && <SideNav />}
        
        <div style={{ zIndex: '1', position: 'relative', minHeight: '100vh', backgroundColor: '#121827', minWidth: '100vw'}}>
          <Outlet />
        </div>
        
      </div>
      {/* {location.pathname.includes('duo') && <BottomNav />} */}
      {/* <div style={{ backgroundColor: '#121827', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <footer className='footer-container'>
          
        </footer>
      </div> */}
      
      {isMobile && !location.pathname.includes('login') && <BottomNav />}
    </>
    
  )
}

export default App
