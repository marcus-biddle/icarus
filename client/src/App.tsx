import React, { useEffect, useState } from 'react'
import './App.css'
import { NavLink, Outlet, redirect, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
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

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile({});
  const creationDate = useSelector((state: RootState) => state?.user.currentUser?.creationDate)
  const user = useSelector((state: RootState) => state?.user.currentUser);
  const userId = useSelector((state: RootState) => state.user.currentUser?.id);
  const name = useSelector((state: RootState) => state.user.currentUser?.username) || '? ?';
  const dispatch = useDispatch();

  const [sidebarSize, setSidebarSize] = useState(25);

  const handleRemoveUser = () => {
    console.log('clicked')
    dispatch(removeUser());
  };

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
      <div>
        
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
          <div className="flex justify-center p-6 min-h-screen mb-32">
            <Outlet />
            <Toaster />
          </div>
        </div>
        }
        
      </div>

      
      {isMobile && !location.pathname.includes('login') && 
      <div className=' fixed right-10 bottom-10'>
        <Popover>
          <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className=' h-14 w-14'>
            <GoGear className="h-10 w-10 text-primary" />
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
                    <NavLink to={path.name === 'Profile' ? `${path.link}/${userId}` : path.link} className={({ isActive }) =>
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
                        : <path.icon className=' h-[40px] w-[40px] transition-none' />
                        // <DynamicIcon icon={path.icon} height={'40px'} width={'40px'} />
                        }
                        <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight w-32 transition-all duration-150 ease-in-out`}>{path.name}</h4>
                    </NavLink>
                </div>
            ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      }
    </div>
  )
}

export default App
