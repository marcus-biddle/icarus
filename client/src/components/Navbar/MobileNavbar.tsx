import React from 'react';
import './MobileNavbar.css';
import { NavLink } from 'react-router-dom';
import { PushupModal } from '../Modals/PushupModal';
import { usePushupCounter } from '../../utilities/hooks/usePushupCounter';

const MobileNavbar = () => {
  const { openModal, isModalOpen } = usePushupCounter();
  
  return (
    <nav>
      <div className="bottom-nav-container">
        <div className="bottom-nav-bar">
          {/* Left Nav Items */}
          <div style={{ display: 'flex', width: '40%'}}>
            <NavLink to={'/'} className="nav-item">Home</NavLink>
            <div className="nav-item">Activity</div>
          </div>
          <div style={{ display: 'flex', width: '40%'}}>
            <div className="nav-item">User</div>
            <div className="nav-item">Settings</div>
          </div>
        </div>
      </div>
      {/* Floating Button */}
      <div className="floating-button-container">
        <div className="floating-button" onClick={openModal}>+</div>
      </div>
      <PushupModal isOpen={isModalOpen} />
    </nav>
    
  )
}

export default MobileNavbar