import React, { useState } from 'react';
import { GoHome, GoMortarBoard, GoTrophy, GoTelescope, GoOrganization, GoIssueDraft, GoSignOut, GoLightBulb } from "react-icons/go";
import { NavLink } from 'react-router-dom';
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
import { getInitials } from '../../../NEWlayouts/Profile';
import { VscGraph } from "react-icons/vsc";
import { GiLaurelsTrophy } from "react-icons/gi";
import { PATHS } from '../MobileNav';





const SideNav = ({size}: {size: number}) => {
    const userId = useSelector((state: RootState) => state.user.currentUser?.id);
    const name = useSelector((state: RootState) => state.user.currentUser?.username) || '? ?';
  return (
    <nav >
        <div className='flex justify-center text-baseline items-start gap-2 text-primary my-8 transition-all duration-300 ease'>
            <DynamicIcon icon={GiGorilla} width='40px' height='40px' color='text-accent' />
            {<h1 className={`scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl ${size <= 20 ? 'opacity-10 scale-0 absolute ' : 'opacity-100 '} transition-all duration-150 ease-in-out`}>
                FitWars
            </h1>}
        </div>
        <ul className=' my-16 list-none'>
            {PATHS.map((path) => (
                <li key={path.name}>
                    <NavLink to={path.name === 'Profile' ? `${path.link}/${userId}` : path.link} className={({ isActive }) =>
                        isActive ? 'flex justify-center gap-2 items-center my-4 bg-primary-foreground border border-primary rounded-[--radius] mx-10 p-2' : 'flex justify-center gap-2 items-center my-4 hover:bg-muted rounded-[--radius] mx-10 p-2'
                        }
                    >
                        {path.name === 'Profile' 
                        ? 
                        <Avatar className=' w-[40px] h-[40px]'>
                            <AvatarImage src={name === 'Marcus Biddle' ? "https://github.com/shadcn.png" : ''} alt="@shadcn" />
                            <AvatarFallback>{getInitials(name)}</AvatarFallback>
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