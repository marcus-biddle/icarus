import React, { useState } from 'react';
import './TopNavbar.css';
// import { logsActions } from '../../api/recentChanges';
import { CiMenuBurger, CiCirclePlus, CiDark, CiLight, CiCloudSun, CiChat2 } from "react-icons/ci";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Sidemenu from './Sidemenu/Sidemenu';
import { PushupModal } from '../Modals/PushupModal';
import { usePushupCounter } from '../../utilities/hooks/usePushupCounter';
import { useThemeContext } from '../../utilities/hooks/useThemeContext';
import { LOGO } from '../../assets/index'
import { Show } from '../../helpers/functional';
import { useIsMobile } from '../../utilities/hooks/useIsMobile';
import { formatAndCapitalize } from '../../helpers/text';
import { IconButton } from '../Buttons/IconButton';

const TopNavbar = () => {
  // const [isDropdownOpen, setDropdownOpen] = useState(false);
  // const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal, isModalOpen, closeModal } = usePushupCounter();
  const isMobile = useIsMobile();
  const { theme, toggleTheme } = useThemeContext();
  const pageName = location.pathname === '/home' ? 'Dashboard' : formatAndCapitalize(location.pathname);

  return (
    <>
    <nav className="top-navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px'}}>
          <IconButton size='medium' onClick={() => setIsOpen(true)}>
            <CiMenuBurger style={{ width: '66%', height: '100%', color: '#0057a4', position: 'absolute', top: '0', left: '17%'}} />
          </IconButton>
          {/* <button className="navbar-menu-icon" onClick={() => setIsOpen(true)}>
            <CiMenuBurger style={{ width: '66%', height: '100%', color: '#0057a4', position: 'absolute', top: '0', left: '17%'}} />
          </button> */}
          
          <h4>{pageName}</h4>
          <Show when={!isMobile}>
            <div style={{ position: 'relative', width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', cursor: 'pointer'}}>
              <img src={LOGO} alt='' style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }} onClick={() => navigate('/home')} />
            </div>
          </Show>
          
        </div>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center'}}>
          {/* <NavLink to={`/user/`}>
            <button className="navbar-button" onClick={toggleTheme}>
              <Show when={theme === 'light'}>
                <CiLight style={{ width: '100%', height: '100%', color: '#0057a4'}}/>
              </Show>
              <Show when={theme === 'dark'}>
                <CiDark style={{ width: '100%', height: '100%', color: '#0057a4'}}/>
              </Show>
            </button>
          </NavLink> */}
          <IconButton size='medium' onClick={() => navigate('/chat')}>
            <CiChat2 style={{ width: '75%', height: '100%', color: '#0057a4', position: 'absolute', top: '0', left: '12%'}}/>
          </IconButton>
          <IconButton size='medium' onClick={openModal}>
            <CiCirclePlus style={{ width: '77%', height: '100%', color: '#0057a4', position: 'absolute', top: '0', left: '12%'}}/>
          </IconButton>
          {/* <button className="navbar-button" onClick={openModal}>
            <CiCirclePlus style={{ width: '100%', height: '100%', color: '#0057a4'}}/>
          </button> */}
        </div>
      </nav>
      <Sidemenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <PushupModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default TopNavbar;
