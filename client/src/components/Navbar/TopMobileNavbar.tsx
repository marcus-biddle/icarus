import React, { useState } from 'react';
import './TopMobileNavbar.css';
// import { recentChangesActions } from '../../api/recentChanges';
import { CiMenuBurger, CiCirclePlus } from "react-icons/ci";
import { useLocation } from 'react-router-dom';
import Sidemenu from '../Sidemenu/Sidemenu';
import { PushupModal } from '../Modals/PushupModal';
import { usePushupCounter } from '../../utilities/hooks/usePushupCounter';

const TopMobileNavbar = () => {
  // const [isDropdownOpen, setDropdownOpen] = useState(false);
  // const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { openModal, isModalOpen, closeModal } = usePushupCounter();

  const pageName = location.pathname === '/home' ? 'Dashboard' : location.pathname === '/leader-board' ? 'Leader Board' : location.pathname;
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
    <div className="top-navbar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="navbar-menu-icon" onClick={() => setIsOpen(true)}>
            <CiMenuBurger style={{ width: '75%', height: '75%', color: '#575f68'}} />
          </button>
          <p style={{ padding: '0 24px', fontWeight: '700', letterSpacing: '.25px'}}>{pageName}</p>
        </div>
        <button className="navbar-button" onClick={openModal}>
          <CiCirclePlus style={{ width: '100%', height: '100%', color: '#575f68'}}/>
        </button>
        {/* <Show when={isDropdownOpen}>
          <div className="dropdown">
              {showIfOrElse(isArrayEmpty(data))(<p>{emptyDataMsg}</p>)(
                  <>
                  <h3>Recent Events</h3>
                    <ul>
                        {data && data.map((item: { action: string }, index) => (
                            <li key={index}>
                            {item.action} 
                            </li>
                        ))}
                    </ul>
                  </>
              )}
          </div>
        </Show> */}
      </div>
      <Sidemenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <PushupModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default TopMobileNavbar;
