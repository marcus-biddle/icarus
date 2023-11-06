import React from 'react';
import './MobileNavbar.css';
import { NavLink } from 'react-router-dom';
import { PushupModal } from '../Modals/PushupModal';
import { usePushupCounter } from '../../utilities/hooks/usePushupCounter';
import { CiUser, CiSettings, CiShirt, CiHome } from "react-icons/ci";

const MobileNavbar = () => {
  const { openModal, isModalOpen, closeModal } = usePushupCounter();
  
  return (
      <div className="bottom-nav-container">
        <div className="bottom-nav-bar">
          <div style={{ display: 'flex'}}>
            <NavLink to={'/'} className="nav-item">
              <CiHome style={{ height: '75%', width: '75%'}} />
              Home
            </NavLink>
            <NavLink to={'/players'} className="nav-item">
              <CiShirt style={{ height: '75%', width: '75%'}} />
              Activity
            </NavLink>
          </div>
          <div style={{ display: 'flex'}}>
            <NavLink to={'/home'}  className="nav-item">
              <CiUser style={{ height: '75%', width: '75%'}} />
              User
            </NavLink>
            <NavLink to={'/'} className="nav-item">
              <CiSettings style={{ height: '75%', width: '75%'}} />
              Settings
            </NavLink>
          </div>
        </div>
        <div className="floating-button-container">
          <div className="floating-button" onClick={openModal}>+</div>
        </div>
        <PushupModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
      
      
      
    
  )
}

export default MobileNavbar