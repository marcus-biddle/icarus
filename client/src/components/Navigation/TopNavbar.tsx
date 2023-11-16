import React, { useState } from 'react';
import './TopNavbar.css';
// import { logsActions } from '../../api/recentChanges';
import { CiMenuBurger, CiCirclePlus, CiDark, CiLight } from "react-icons/ci";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Sidemenu from './Sidemenu/Sidemenu';
import { PushupModal } from '../Modals/PushupModal';
import { usePushupCounter } from '../../utilities/hooks/usePushupCounter';
import { useThemeContext } from '../../utilities/hooks/useThemeContext';
import { LOGO } from '../../assets/index'
import { Show } from '../../helpers/functional';
import { useIsMobile } from '../../utilities/hooks/useIsMobile';
import { formatAndCapitalize } from '../../helpers/text';

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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="navbar-menu-icon" onClick={() => setIsOpen(true)}>
            <CiMenuBurger style={{ width: '66%', height: '100%', color: '#0057a4', position: 'absolute', top: '0', left: '17%'}} />
          </button>
          <Show when={!isMobile}>
            <img src={LOGO} alt='logo' style={{ width: '90px', height: '100%', cursor: 'pointer' }} onClick={() => navigate('/home')}/>
          </Show>
          <h2 style={{ padding: '0 8px' }}>{pageName}</h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '120px'}}>
          <NavLink to={`/user/`}>
            <button className="navbar-button" onClick={toggleTheme}>
              <Show when={theme === 'light'}>
                <CiLight style={{ width: '100%', height: '100%', color: '#0057a4'}}/>
              </Show>
              <Show when={theme === 'dark'}>
                <CiDark style={{ width: '100%', height: '100%', color: '#0057a4'}}/>
              </Show>
            </button>
          </NavLink>
          <button className="navbar-button" onClick={openModal}>
            <CiCirclePlus style={{ width: '100%', height: '100%', color: '#0057a4'}}/>
          </button>
        </div>
      </nav>
      <Sidemenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <PushupModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default TopNavbar;
