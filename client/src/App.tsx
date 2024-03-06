import React, { useEffect, useState } from 'react'
import './App.css'
import { NavLink, Outlet, redirect, useLoaderData, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { useAuthCheck } from './utilities/hooks/useAuthCheck';
import SideNav, { PATHS } from './components/Navigation/SideNav/SideNav';
import { useIsMobile } from './utilities/hooks/useIsMobile';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { Button } from "./components/ui/button"
import { GoGear } from "react-icons/go";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import { Toaster } from "./components/ui/sonner"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./components/ui/avatar"
import { getInitials } from './NEWlayouts/Profile/Profile';
import { removeUser } from './features/user/userSlice';
import { CiMenuKebab } from "react-icons/ci";
import { ExerciseSelection } from './components/ExerciseSelection/ExerciseSelection';
import { GiGorilla } from "react-icons/gi";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile({});
  const creationDate = useSelector((state: RootState) => state?.user.currentUser?.creationDate)
  const user = useSelector((state: RootState) => state?.user.currentUser);
  const userId = useSelector((state: RootState) => state.user.currentUser?.id);
  const name = useSelector((state: RootState) => state.user.currentUser?.username) || '? ?';
  const dispatch = useDispatch();
  const {state} = useNavigation();

  const [sidebarSize, setSidebarSize] = useState(25);
  console.log(state)

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
                  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">FitWars</h1>
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
      <nav className="fixed bottom-0 left-0 right-0 bg-background border text-white flex justify-around items-center py-3 shadow-2xl">
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
        {/* <Popover>
          <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className=' h-14 w-14'>
            <CiMenuKebab className="h-10 w-10 text-primary" />
          </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 mr-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">War Portal</h4>
                <p className="text-sm text-muted-foreground">
                  Tap to navigate  through site.
                </p>
              </div>
              <div className="grid gap-2">
            {PATHS.map((path) => (
                <div key={path.name} onClick={() => path.name === 'Logout' ? handleRemoveUser() : null}>
                    <NavLink to={path.name === 'Warrior' ? `${path.link}/${userId}` : path.link} className={({ isActive }) =>
                        isActive ? 'flex justify-evenly items-center my-2 bg-primary-foreground border border-primary rounded-[--radius] p-2' 
                        : 'flex justify-evenly items-center my-2 hover:bg-muted rounded-[--radius] p-2'
                        }
                    >
                        {path.name === 'Profile' 
                        ? 
                        <Avatar className=' w-[40px] h-[40px]'>
                            <AvatarImage src={name === 'Marcus Biddle' ? "https://github.com/shadcn.png" : ''} alt="@shadcn" />
                            <AvatarFallback>{getInitials(name)}</AvatarFallback>
                        </Avatar> 
                        : <path.icon className=' h-[32px] w-[32px] transition-none' />
                        // <DynamicIcon icon={path.icon} height={'40px'} width={'40px'} />
                        }
                        <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight w-32 transition-all duration-150 ease-in-out`}>{path.name}</h4>
                    </NavLink>
                </div>
            ))}
              </div>
            </div>
          </PopoverContent>
        </Popover> */}
      </nav>
      
      }
    </div>
  )
}

export default App
