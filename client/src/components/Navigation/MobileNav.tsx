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
import { PATHS } from './SideNav/SideNav';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Show } from '../../helpers/functional'

export const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);
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
                    <ul className='text-left [&>li]:mt-2'>
                        {PATHS.map((path) => (
                            <li key={path.name}>
                                <SheetClose asChild>
                                    <NavLink to={path.name === 'Profile' ? `${path.link}/${userId}` : path.link}>
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