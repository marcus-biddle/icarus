import React, { useEffect, useState } from 'react'
import './App.css'
import { Outlet, redirect, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { useAuthCheck } from './utilities/hooks/useAuthCheck';
import LandingPageLayout from './layouts/LandingPage/LandingPageLayout';
import BottomNav from './components/Navigation/Bottom/BottomNav';
import SideNav from './components/Navigation/SideNav/SideNav';
import { useIsMobile } from './utilities/hooks/useIsMobile';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { UserState } from './features/user/userSlice';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import { Toaster } from "./components/ui/sonner"

function App() {
  const auth = useAuthCheck();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile({});
  const creationDate = useSelector((state: RootState) => state?.user.currentUser?.creationDate)
  const user = useSelector((state: RootState) => state?.user.currentUser);
  const leaderboard = useSelector((state: RootState) => state.leaderboard.currentLeaderboard);

  const [sidebarSize, setSidebarSize] = useState(25);

  useEffect(() => {
    if (!creationDate) {
      navigate('duo/login')
    }
    console.log('User -App.tsx', user);
    console.log('Leaderboard -App.tsx', leaderboard);
  }, [location.pathname, creationDate])

  return (
    <>
      <div >
        
        {!isMobile ? <ResizablePanelGroup direction={"horizontal"} onLayout={(sizes) => setSidebarSize(sizes[0])}>
          <ResizablePanel defaultSize={0} className=' min-w-[155px]'>
            <SideNav size={sidebarSize} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={100} className=' min-w-[50%]'>
            <div className="flex justify-center p-6 min-h-screen">
              <Outlet />
              <Toaster />
            </div>
            
          </ResizablePanel>
        </ResizablePanelGroup>
        :
        <div>
          <div className="flex justify-center p-6 min-h-screen mb-32">
            <Outlet />
            <Toaster />
          </div>
        </div>
        }
        
      </div>

      
      {isMobile && !location.pathname.includes('login') && <BottomNav />}
    </>
    
  )
}

export default App
