import React from 'react';
import './BottomNav.css'
import { PATHS } from '../SideNav/SideNav';
import { NavLink } from 'react-router-dom';
import { DynamicIcon } from '../../Icons/DynamicIcon';

const BottomNav = () => {
  return (
    <div className='bottom-nav-container'>
        <div className='link-container'>
            {PATHS.map((path) => (
                <NavLink to={path.link} key={path.name} >
                    <DynamicIcon icon={path.icon} height={'60px'} width={'60px'} color='black' />
                </NavLink>
            ))}
        </div>
        
    </div>
  )
}

export default BottomNav