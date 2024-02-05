import React, { useState } from 'react';
import { GoHome, GoMortarBoard, GoTrophy, GoTelescope, GoOrganization, GoIssueDraft, GoLock, GoLightBulb } from "react-icons/go";
import './index.css';
import { NavLink } from 'react-router-dom';
import { useIsMobile } from '../../../utilities/hooks/useIsMobile';
import { DynamicIcon } from '../../Icons/DynamicIcon';
import { IconType } from 'react-icons/lib';
import { GiGorilla } from "react-icons/gi";
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';


interface PathItem {
    name: string;
    icon: IconType;
    link: string;
    locked: boolean;
  }

export const PATHS: PathItem[] = [
    // { name: 'Workouts', icon: GoHome, link: 'duo/sections', locked: true },
    { name: 'Practice', icon: GoLightBulb, link: '/duo/practice', locked: false },
    // { name: 'History', icon: GoMortarBoard, link: '/duo/history', locked: false },
    // { name: 'Leaderboards', icon: GoTrophy, link: 'duo/leaderboard', locked: false },
    // { name: 'Quests', icon: GoTelescope, link: '/test', locked: true },
    // { name: 'Shop', icon: GoOrganization, link: '/test', locked: true },
    { name: 'Profile', icon: GoIssueDraft, link: '/duo/user', locked: false },
]

const SideNav = () => {
    const isMobile = useIsMobile({ threshold: 1150 });
    const userId = useSelector((state: RootState) => state.user.currentUser?.id);
  return (
    <nav className='container'>
        {!isMobile && <div style={{ padding: '18px 32px'}}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1DB954'}}>
                <DynamicIcon icon={GiGorilla} width='30px' height='30px' color='white' />
                <h2 style={{ margin: '0', color: 'inherit', fontWeight: '700', letterSpacing: '1.12px', fontSize: '32px'}}>FitWars</h2>
            </div>
        </div>}
        <ul className='new-nav-list'>
            {PATHS.map((path) => (
                <li key={path.name}>
                    <NavLink to={path.name === 'Profile' ? `${path.link}/${userId}` : path.link} style={{ padding: !isMobile ? '10px 50px 8px 0' : '5px 4px 0 4px', transition: 'all 0.5s'}}>
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