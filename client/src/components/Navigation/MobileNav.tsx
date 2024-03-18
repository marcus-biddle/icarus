import React, { useState } from 'react'
import { SlMenu } from "react-icons/sl";
import { Button } from '../ui/button';
import { AiOutlineClose } from "react-icons/ai";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "../ui/sheet"
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Show } from '../../helpers/functional'
import { GoHome, GoMortarBoard, GoTrophy, GoTelescope, GoOrganization, GoIssueDraft, GoSignOut, GoLightBulb } from "react-icons/go";
import { IconType } from 'react-icons/lib';
import { removeUser } from '../../features/user/userSlice';
import { Separator } from '../ui/separator';

interface PathItem {
    name: string;
    icon: IconType;
    link: string;
  }

export const PATHS: PathItem[] = [
    { name: 'Activity', icon: GoHome, link: '/activity' },
    { name: 'Train', icon: GoLightBulb, link: '/train' },
    { name: 'Competitors', icon: GoLightBulb, link: '/competitors' },
    // { name: 'Winners', icon: GiLaurelsTrophy, link: '/group' },
    // { name: 'History', icon: GoMortarBoard, link: '/history', locked: false },
    // { name: 'Leaderboards', icon: GoTrophy, link: 'duo/leaderboard', locked: false },
    // { name: 'Quests', icon: GoTelescope, link: '/test', locked: true },
    // { name: 'Shop', icon: GoOrganization, link: '/test', locked: true },
    { name: 'Profile', icon: GoIssueDraft, link: '/user' },
    { name: 'Logout', icon: GoSignOut, link: '' },
]

export const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.user.currentUser?.id);

  return (
    <Show when={!location.pathname.includes('login')}>
        <Sheet>
            <SheetTrigger asChild>
            <Button 
            variant={"ghost"} 
            onClick={() => setIsOpen(!isOpen)}
            className={`flex justify-center items-center text-center p-2 transform transition-transform duration-200 ${isOpen ? ' rotate-180' : ''}`}>
                <SlMenu className=' h-10 w-10' />
            </Button>
            </SheetTrigger>
            <SheetContent side={'top'} className="w-full">
                <SheetHeader>
                <SheetTitle className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Menu</SheetTitle>
                <SheetDescription asChild>
                    <ul className='text-left'>
                        {PATHS.map((path, index) => (
                            <li key={path.name} className={`${index === PATHS.length - 1 ? 'mt-20' : 'mt-2'}`}>
                                <Show when={path.name === 'Logout'}>
                                    <Separator className='my-4' />
                                </Show>
                                <SheetClose asChild>
                                    <NavLink to={path.name === 'Profile' ? `${path.link}/${userId}` : path.link} onClick={() => path.name === 'Logout' ? dispatch(removeUser()) : ''}>
                                        <p className="leading-10 scroll-m-20 text-xl font-semibold tracking-tight">{path.name}</p>
                                    </NavLink>
                                </SheetClose>
                            </li>
                        ))}
                    </ul>
                </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    </Show>
    
  )
}