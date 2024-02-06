import React from 'react';
import { PATHS } from '../SideNav/SideNav';
import { NavLink } from 'react-router-dom';
import { DynamicIcon } from '../../Icons/DynamicIcon';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar"
import { getInitials } from '../../../NEWlayouts/Profile/Profile';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

const BottomNav = () => {
  const username = useSelector((state: RootState) => state.user.currentUser?.username) || '? ?';
  const userId = useSelector((state: RootState) => state.user.currentUser?.id);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 p-4">
        <ul className='my-1 flex bg-accent justify-evenly'>
            {PATHS.map((path) => (
                <li key={path.name}>
                    <NavLink to={path.name === 'Profile' ? `${path.link}/${userId}` : path.link} className={({ isActive }) =>
                        isActive ? 'flex justify-center items-center bg-primary-foreground border border-primary rounded-[--radius] p-4' : 'flex justify-center items-center hover:bg-muted rounded-[--radius] p-4'
                        }
                    >
                        {path.name === 'Profile' 
                        ? 
                        <Avatar className=' w-[40px] h-[40px]'>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>{getInitials(username)}</AvatarFallback>
                        </Avatar> 
                        : 
                        <path.icon className=' h-[40px] w-[40px] transition-none' />
                        // <DynamicIcon icon={path.icon} height={'40px'} width={'40px'} />
                        }
                    </NavLink>
                </li>
            ))}
        </ul>
        
    </div>
  )
}

export default BottomNav