import React from 'react';
import { GoHeart, GoStarFill, GoHeartFill, GoFlame, GoGoal } from "react-icons/go";
import { DynamicIcon } from '../Icons/DynamicIcon';
import HoverMenu from '../Menu/HoverMenu';
import './index.css'
import { useIsMobile } from '../../utilities/hooks/useIsMobile';

const StatsBar = () => {
  const isMobile = useIsMobile({});
  return (
    <div className='stats-container' style={{ justifyContent: isMobile ? 'space-between' : 'space-around'}}>
        <HoverMenu icon={<DynamicIcon icon={GoGoal} width='25px' height='25px' color='green'/>}>
        <div>test</div>
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