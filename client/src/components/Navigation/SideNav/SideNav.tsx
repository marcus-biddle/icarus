import React, { useState } from 'react';
import { GoHome, GoMortarBoard, GoTrophy, GoTelescope, GoOrganization, GoIssueDraft, GoLock, GoLightBulb } from "react-icons/go";
import { NavLink } from 'react-router-dom';
import { useIsMobile } from '../../../utilities/hooks/useIsMobile';
import { DynamicIcon } from '../../Icons/DynamicIcon';
import { IconType } from 'react-icons/lib';
import { GiGorilla } from "react-icons/gi";
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "../../../components/ui/avatar"
import { getInitials } from '../../../NEWlayouts/Profile/Profile';


interface PathItem {
    name: string;
    icon: IconType;
    link: string;
  }

export const PATHS: PathItem[] = [
    // { name: 'Workouts', icon: GoHome, link: 'duo/sections', locked: true },
    { name: 'Practice', icon: GoLightBulb, link: '/duo/practice' },
    // { name: 'History', icon: GoMortarBoard, link: '/duo/history', locked: false },
    // { name: 'Leaderboards', icon: GoTrophy, link: 'duo/leaderboard', locked: false },
    // { name: 'Quests', icon: GoTelescope, link: '/test', locked: true },
    // { name: 'Shop', icon: GoOrganization, link: '/test', locked: true },
    { name: 'Profile', icon: GoIssueDraft, link: '/duo/user' },
]

const SideNav = ({size}: {size: number}) => {
    const isMobile = useIsMobile({ threshold: 1150 });
    const userId = useSelector((state: RootState) => state.user.currentUser?.id);
    const username = useSelector((state: RootState) => state.user.currentUser?.username) || '? ?';
  return (
    <nav >
        <div className='flex justify-center text-baseline items-start gap-2 text-primary my-8 transition-all duration-300 ease'>
            <DynamicIcon icon={GiGorilla} width='40px' height='40px' color='text-accent' />
            {<h1 className={`scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl ${size <= 20 ? 'opacity-10 scale-0 absolute ' : 'opacity-100 '} transition-all duration-150 ease-in-out`}>
                FitWars
            </h1>}
        </div>
        <ul className=' my-16'>
            {PATHS.map((path) => (
                <li key={path.name}>
                    <NavLink to={path.name === 'Profile' ? `${path.link}/${userId}` : path.link} className={({ isActive }) =>
                        isActive ? 'flex justify-center gap-2 items-center my-4 bg-primary-foreground border border-primary rounded-[--radius] mx-10 p-2' : 'flex justify-center gap-2 items-center my-4 hover:bg-muted rounded-[--radius] mx-10 p-2'
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
                        {<h4 className={`scroll-m-20 text-xl font-semibold tracking-tight w-32 ${size <= 24 ? 'opacity-10 scale-0 absolute ' : 'opacity-100 '} transition-all duration-150 ease-in-out`}>{path.name}</h4>}
                    </NavLink>
                </li>
            ))}
        </ul>
        
    </nav>
  )
}

export default SideNav