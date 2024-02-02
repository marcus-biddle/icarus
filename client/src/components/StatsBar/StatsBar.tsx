import React from 'react';
import { GoHeart, GoStarFill, GoHeartFill, GoFlame, GoGoal, GoPlus } from "react-icons/go";
import { DynamicIcon } from '../Icons/DynamicIcon';
import HoverMenu from '../Menu/HoverMenu';
import './index.css'
import { useIsMobile } from '../../utilities/hooks/useIsMobile';
import { NavLink } from 'react-router-dom';
import { GiBodySwapping, GiFireBowl, GiWaterSplash } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { UserState, updateCurrentEvent } from '../../features/user/userSlice';
import { GoChevronRight } from "react-icons/go";
import { RootState } from '../../app/store';

const StatsBar = () => {
  const isMobile = useIsMobile({});
  const dispatch = useDispatch();
  const eventList = useSelector((state: RootState) => state.user.currentUser?.eventIds)
  const currentEventId = useSelector((state: RootState) => state.user.currentUser?.currentEventId) || ''
  return (
    <div className='stats-container' style={{ justifyContent: isMobile ? 'space-between' : 'space-around', minWidth: '300px'}}>
        <HoverMenu icon={<DynamicIcon icon={GiBodySwapping} width='25px' height='25px' color='aqua'/>} text={currentEventId}>
        <div style={{ width: '225px'}} className='container'>
          <h6 style={{ padding: '10px 16px', margin: '0', borderBottom: '1px solid #1E293B', textAlign: 'left', textTransform: 'uppercase', fontSize: '13px', color: 'white', letterSpacing: '1.12px'}}>Switch Events</h6>
          <ul className='stats-user-event-list'>
            {eventList?.map((event) => (
              <li key={event} onClick={() => dispatch(updateCurrentEvent(event))}>
                <span>{event === currentEventId ? <DynamicIcon icon={GoChevronRight} width='25px' height='25px' /> : 'activate'}</span>
                <span>{event}</span>
              </li>
            ))}
          </ul>
          <div className='add-event' style={{ borderTop: '1px solid #1E293B' }}>
            <NavLink to='' style={{ color: 'white', border: '1px solid white', borderRadius: '4px', display: 'flex'}}>
              <DynamicIcon icon={GoPlus} width='20px' height='20px' />
            </NavLink>
            <h6 style={{ margin: '0', padding: '0', fontSize: '16px'}}>Add a new event</h6>
          </div>
        </div>
        </HoverMenu>
        <HoverMenu icon={<DynamicIcon icon={GiFireBowl} width='25px' height='25px' color='red' />} text='0'>
        {/* <div className='container'>test</div> */}{null}
        </HoverMenu>
    </div>
  )
}

export default StatsBar