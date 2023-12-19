import React, { useEffect, useRef, useState } from 'react';
import './TopNavbar.css';
// import { logsActions } from '../../api/recentChanges';
import { CiMenuBurger, CiCirclePlus, CiDark, CiLight, CiCloudSun, CiChat2 } from "react-icons/ci";
import { BsPlusLg, BsActivity, BsBrightnessHighFill } from "react-icons/bs";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Sidemenu from './Sidemenu/Sidemenu';
import { EventModal } from '../Modals/EventModal';
import { getCurrentMonth } from '../../helpers/date';
import { LOGO } from '../../assets/index'
import { Show } from '../../helpers/functional';
import { useIsMobile } from '../../utilities/hooks/useIsMobile';
import { formatAndCapitalize } from '../../helpers/text';
import { IconButton } from '../Buttons/IconButton';
import { useOutsideClick } from '../../utilities/hooks/useOutsideClick';
import { useEventModal } from '../../utilities/hooks/useEventModal';
import { pointsActions } from '../../api/points';

interface ExperiencePointsProps {
  total: number;
}

const TopNavbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [expPoints, setExpPoints] = useState<ExperiencePointsProps>({ total: 0 });
  const [isOpen, setIsOpen] = useState(false);
  // const location = useLocation();
  const navigate = useNavigate();
  const { openModal, isModalOpen, closeModal } = useEventModal();
  const isMobile = useIsMobile();

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => setDropdownOpen(false));

  useEffect(() => {
    const fetchData = async () => {
      const response = await pointsActions.getUserPoints();
      setExpPoints(response);
    }

    fetchData();
  }, [])

  return (
    <>
    <nav className="top-navbar">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* <IconButton size='medium' onClick={() => setIsOpen(true)}>
          <CiMenuBurger style={{ width: '66%', height: '100%', color: '#0057a4', position: 'absolute', top: '0', left: '17%'}} />
        </IconButton> */}
        
        <div style={{  display: 'flex', justifyContent: 'center', cursor: 'pointer'}} onClick={() => setIsOpen(true)}>
          <div style={{ position: 'relative', width: '43px', height: '40px', cursor: 'pointer'}}>
            <img src={LOGO} alt='' style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }} />
          </div>
          <Show when={!isMobile}>
            <div style={{ display: 'flex', alignItems: 'flex-end', paddingLeft: '8px' }}>
              <h4 style={{ fontWeight: '500', textTransform: 'uppercase', fontSize: '18px' }}>Icarus</h4>
            </div>
          </Show>
        </div>
      </div>


        <div style={{ display: 'flex', gap: '16px', alignItems: 'center'}}>
          <div style={{ position: 'relative'}}>
            <button className='stats-btn' onClick={() => setDropdownOpen(true)}>
              {/* <CiCirclePlus style={{ width: '100%', height: '100%', color: '#0057a4'}}/> */}
              <BsActivity style={{ width: '20px', height: '100%'}} />
              <Show when={!isMobile}>
                <span style={{ fontWeight: '400', fontSize: '16px' }}>Stats</span>
              </Show>
            </button>
            <Show when={isDropdownOpen}>
                <ul className='stat-dropdown' ref={wrapperRef}>
                <li>
                    <span>Level</span>
                    <span>N/A</span>
                  </li>
                  <li>
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px'}}><BsBrightnessHighFill /> Points</span>
                    <span>{expPoints && expPoints.total}</span>
                  </li>
                  
                  <li>
                    <span>{getCurrentMonth()} Ranking</span>
                    <span>1st</span>
                  </li>
                </ul>
            </Show>
          </div>
          

          {/* <IconButton size='medium' onClick={openModal}> */}
          <button className='add-btn' onClick={openModal}>
            {/* <CiCirclePlus style={{ width: '100%', height: '100%', color: '#0057a4'}}/> */}
            <BsPlusLg style={{ width: '20px', height: '100%'}} />
            <span style={{ fontWeight: '400', fontSize: '16px' }}>Event</span>
          </button>
            
          {/* </IconButton> */}
          {/* <button className="navbar-button" onClick={openModal}>
            <CiCirclePlus style={{ width: '100%', height: '100%', color: '#0057a4'}}/>
          </button> */}
        </div>
      </nav>
      <Sidemenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <EventModal isOpen={isModalOpen} onClose={closeModal} />
      
    </>
  );
};

export default TopNavbar;
