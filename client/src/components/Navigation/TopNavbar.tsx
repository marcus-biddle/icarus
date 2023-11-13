import React, { useState } from 'react';
import './TopNavbar.css';
// import { recentChangesActions } from '../../api/recentChanges';
import { CiMenuBurger, CiCirclePlus, CiUser } from "react-icons/ci";
import { NavLink, redirect, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import Sidemenu from './Sidemenu/Sidemenu';
import { PushupModal } from '../Modals/PushupModal';
import { usePushupCounter } from '../../utilities/hooks/usePushupCounter';
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
  const data = useLoaderData();
  const pageName = location.pathname === '/home' ? 'Dashboard' : formatAndCapitalize(location.pathname);
  // const emptyDataMsg = 'No activity in the last week.'

  // const toggleDropdown = () => {
  //   setDropdownOpen(!isDropdownOpen);
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //       const response = await recentChangesActions.getAllRecentChanges();
  //       setData(response);
  //   }

  //   fetchData();
    
  // }, [])

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
          <p style={{ padding: '0 8px', fontWeight: '700', letterSpacing: '.25px'}}>{pageName}</p>
        </div>
        {/* <div style={{ display: 'flex', justifyContent: 'space-between', width: '120px'}}> */}
          {/* <NavLink to={`/user/`}>
            <button className="navbar-button">
              <CiUser style={{ width: '100%', height: '100%', color: '#0057a4'}}/>
            </button>
          </NavLink> */}
          <button className="navbar-button" onClick={openModal}>
            <CiCirclePlus style={{ width: '100%', height: '100%', color: '#0057a4'}}/>
          </button>
        {/* </div> */}
      </nav>
      <Sidemenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <PushupModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default TopNavbar;
