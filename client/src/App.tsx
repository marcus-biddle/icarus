import React, { useEffect, useState } from 'react'
import './App.css'
import { NavLink, Outlet, redirect, useLoaderData, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import SideNav, { PATHS } from './components/Navigation/SideNav/SideNav';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import { Toaster } from "./components/ui/sonner"
import { removeUser } from './features/user/userSlice';
import { CiMenuKebab } from "react-icons/ci";
import { ExerciseSelection } from './components/ExerciseSelection/ExerciseSelection';
import { GiGorilla } from "react-icons/gi";
import { useIsMobile } from './hooks/useIsMobile';
import { Loader } from './components/Loader/Loader';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile({});
  const creationDate = useSelector((state: RootState) => state?.user.currentUser?.creationDate)
  const user = useSelector((state: RootState) => state?.user.currentUser);
  const userId = useSelector((state: RootState) => state.user.currentUser?.id);
  const name = useSelector((state: RootState) => state.user.currentUser?.username) || '? ?';
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading.loading);

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
        <div>
          <div className="min-h-screen mb-32">
            {!location.pathname.includes('user') && <div className=' bg-primary-foreground border text-white rounded-sm px-6 py-6'>
              {!location.pathname.includes('login')  && <ExerciseSelection />}
              <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight capitalize text-left py-4 text-primary">
                {location.pathname.includes('login') ? 
                <div className='flex text-baseline gap-2 text-primary w-full text-left items-end'>
                  <GiGorilla className=' w-[50px] h-[50px] text-accent' />
                  <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-5xl">FitWars</h1>
                </div>
                : location.pathname.slice(1)}
              </h1>
            </div>}
            
            <div className=' p-6'>
              <Outlet />
            </div>
            
            <Toaster />
          </div>
        </div>
        }
        
      </>

      
      {isMobile && !location.pathname.includes('login') && 
      <nav className="fixed bottom-0 left-0 right-0 bg-primary-foreground text-white flex justify-around items-center py-3 shadow-2xl w-full">
            {PATHS.map((path) => (
                <div key={path.name} className='flex flex-col items-center'>
                    <NavLink to={path.name === 'Profile' ? `${path.link}/${userId}` : path.link} className={({ isActive }) =>
                        isActive ? 'flex flex-col items-center my-2  rounded-[--radius] text-primary' 
                        : 'flex flex-col items-center my-2 hover:bg-muted rounded-[--radius]'
                        }
                    >
                        <path.icon className=' h-[25px] w-[25px] transition-none' />
                        <p className={`scroll-m-20 font-light tracking-wider transition-all duration-150 ease-in-out`}>{path.name}</p>
                    </NavLink>
                </div>
            ))}
      </nav>
      
      }
    </div>
  )
}

export default App
