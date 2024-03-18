import React, { useEffect, useState } from 'react'
import './App.css'
import { Outlet,  useLocation, useNavigate, useNavigation } from 'react-router-dom';
import SideNav from './components/Navigation/SideNav/SideNav';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import { Toaster } from "./components/ui/sonner"
import { removeUser } from './features/user/userSlice';
import { GiGorilla } from "react-icons/gi";
import { useIsMobile } from './hooks/useIsMobile';
import { MobileNav } from './components/Navigation/MobileNav';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile({});
  const creationDate = useSelector((state: RootState) => state?.user.currentUser?.creationDate)
  const user = useSelector((state: RootState) => state?.user.currentUser);
  const dispatch = useDispatch();

  const [sidebarSize, setSidebarSize] = useState(25);

  useEffect(() => {
    if (!creationDate && !location.pathname.includes('login')) {
      navigate('/login')
      dispatch(
        removeUser()
      )
    }
    console.log('User -App.tsx', user);
  }, [location.pathname, creationDate])

  return (
    <div className=' relative'>
      <>
        
        {!isMobile && !location.pathname.includes('login') ? <ResizablePanelGroup direction={"horizontal"} onLayout={(sizes) => setSidebarSize(sizes[0])}>
          {<ResizablePanel defaultSize={0} className=' min-w-[155px]'>
            <SideNav size={sidebarSize} />
          </ResizablePanel>}
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={100} className=' min-w-[50%]'>
            <div className="flex justify-center p-6 min-h-screen">
              <Outlet />
              <Toaster />
            </div>
            
          </ResizablePanel>
        </ResizablePanelGroup>
        :
        <>
          <div className=" " style={{ height: 'calc(100vh + 8rem)' }}>
            {<div className=' bg-primary-foreground border text-white rounded-sm flex flex-row-reverse justify-between text-center items-center p-4'>
              {!location.pathname.includes('login')  && <MobileNav />}
              <>
                {location.pathname.includes('login') ? 
                <div className='flex text-baseline gap-2 text-primary w-full text-left items-end'>
                  <GiGorilla className=' w-[50px] h-[50px] text-accent' />
                  <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-5xl">FitWars</h1>
                </div>
                : <h1 key={location.pathname.split('/')[1]} className="scroll-m-20 text-3xl font-extrabold tracking-wider capitalize text-primary animate-fadeIn">{location.pathname.split('/')[1]}</h1>}
              </>
            </div>}
            
            <div className=' p-6'>
              <Outlet />
            </div>
            
            
          </div>
          <Toaster />
        </>
        }
        
      </>
    </div>
  )
}

export default App
