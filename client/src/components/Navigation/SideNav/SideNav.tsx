import React, { useState } from 'react';
import { GoHome, GoMortarBoard, GoTrophy, GoTelescope, GoOrganization, GoIssueDraft } from "react-icons/go";
import './index.css';
import { NavLink } from 'react-router-dom';
import { useIsMobile } from '../../../utilities/hooks/useIsMobile';
import { DynamicIcon } from '../../Icons/DynamicIcon';
import { IconType } from 'react-icons/lib';


interface PathItem {
    name: string;
    icon: IconType;
    link: string;
  }

export const PATHS: PathItem[] = [
    { name: 'Workout', icon: GoHome, link: 'duo/sections' },
    { name: 'Practice', icon: GoMortarBoard, link: '/test' },
    { name: 'Leaderboards', icon: GoTrophy, link: 'duo/leaderboard' },
    { name: 'Quests', icon: GoTelescope, link: '/test' },
    { name: 'Shop', icon: GoOrganization, link: '/test' },
    { name: 'Profile', icon: GoIssueDraft, link: '/test' },
]

const SideNav = () => {
    const isMobile = useIsMobile({ threshold: 1150 });
  return (
    <nav className='new-nav-container'>
        {!isMobile && <h1 className='new-logo'>quickies</h1>}
        <ul className='new-nav-list'>
            {PATHS.map((path) => (
                <li>
                    <NavLink to={path.link} end style={{ padding: !isMobile ? '10px 50px 8px 0' : '5px 4px 0 4px', transition: 'all 0.5s'}}>
                        {/* <span>{path.icon}</span> */}
                        <span>
                            <DynamicIcon icon={path.icon} height={'30px'} width={'30px'} />
                        </span>
                        {!isMobile && <span>{path.name}</span>}
                    </NavLink>
                </li>
            ))}
        </ul>
        
    </nav>
  )
}

export default SideNav