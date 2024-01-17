import React, { useState } from 'react';
import { GoHome, GoMortarBoard, GoTrophy, GoTelescope, GoOrganization, GoIssueDraft, GoLock } from "react-icons/go";
import './index.css';
import { NavLink } from 'react-router-dom';
import { useIsMobile } from '../../../utilities/hooks/useIsMobile';
import { DynamicIcon } from '../../Icons/DynamicIcon';
import { IconType } from 'react-icons/lib';


interface PathItem {
    name: string;
    icon: IconType;
    link: string;
    locked: boolean;
  }

export const PATHS: PathItem[] = [
    { name: 'Workouts', icon: GoHome, link: 'duo/sections', locked: true },
    { name: 'Practice', icon: GoMortarBoard, link: '/duo/practice', locked: false },
    { name: 'History', icon: GoMortarBoard, link: '/duo/history', locked: false },
    { name: 'Leaderboards', icon: GoTrophy, link: 'duo/leaderboard', locked: false },
    { name: 'Quests', icon: GoTelescope, link: '/test', locked: true },
    // { name: 'Shop', icon: GoOrganization, link: '/test', locked: true },
    { name: 'Profile', icon: GoIssueDraft, link: '/test', locked: false },
]

const SideNav = () => {
    const isMobile = useIsMobile({ threshold: 1150 });
  return (
    <nav className='container'>
        {!isMobile && <h1 className='new-logo'>quickies</h1>}
        <ul className='new-nav-list'>
            {PATHS.map((path) => (
                <li>
                    <NavLink to={path.locked ? '/duo/null' : path.link} style={{ padding: !isMobile ? '10px 50px 8px 0' : '5px 4px 0 4px', transition: 'all 0.5s'}}>
                        {/* <span>{path.icon}</span> */}
                        <span>
                            <DynamicIcon icon={path.locked ? GoLock : path.icon} height={'30px'} width={'30px'} />
                        </span>
                        {!isMobile && <span style={{ transition: 'all .3s ease'}}>{path.name}</span>}
                    </NavLink>
                </li>
            ))}
        </ul>
        
    </nav>
  )
}

export default SideNav