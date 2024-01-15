import React from 'react';
import { GoHeart, GoStarFill, GoHeartFill, GoFlame, GoGoal } from "react-icons/go";
import { DynamicIcon } from '../Icons/DynamicIcon';
import HoverMenu from '../Menu/HoverMenu';
import './index.css'
import { useIsMobile } from '../../utilities/hooks/useIsMobile';
import { NavLink } from 'react-router-dom';

const StatsBar = () => {
  const isMobile = useIsMobile({});
  return (
    <div className='stats-container' style={{ justifyContent: isMobile ? 'space-between' : 'space-around'}}>
        <HoverMenu icon={<DynamicIcon icon={GoGoal} width='25px' height='25px' color='green'/>}>
        <div style={{ minWidth: '200px'}}>
          <h6 style={{ padding: '4px 16px', margin: '0', borderBottom: '2px solid grey', textAlign: 'left', textTransform: 'uppercase', fontSize: '14px', color: 'grey'}}>My Events</h6>
          <ul className='stats-user-event-list'>
            <li>
              <NavLink to=''>
                <span>ICON</span>
                <span>Calisthenics</span>
              </NavLink>
            </li>
            <li>
              <NavLink to=''>
                <span>ICON</span>
                <span>Running</span>
              </NavLink>
            </li>
          </ul>
          <div className='add-event' style={{ borderTop: '1px solid grey'}}>
            <div>+</div>
            <h6 style={{ margin: '0', padding: '0', fontSize: '14px'}}>Add a new event</h6>
          </div>
        </div>
        </HoverMenu>
        <HoverMenu icon={<DynamicIcon icon={GoFlame} width='25px' height='25px' color='red' />}>
        <div>test</div>
        </HoverMenu>
        <HoverMenu icon={ <DynamicIcon icon={GoStarFill} width='25px' height='25px' color='yellow' />}>
        <div>test</div>
        </HoverMenu>
        <HoverMenu icon={<DynamicIcon icon={GoHeartFill} width='25px' height='25px' color='red' />}>
        <div>test</div>
        </HoverMenu>
    </div>
  )
}

export default StatsBar