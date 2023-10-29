import React, { useState } from 'react';
import { GoogleAuth } from '../GoogleLogin/GoogleLogin';
import './DesktopNavbar.css';
import { NavLink, useLoaderData, useNavigate } from 'react-router-dom';
import { PushupModal } from '../Modals/PushupModal';
import { pushupActions } from '../../api/pushups'

const DesktopNavbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const data = localStorage.getItem('idToken');

  const handleAddPushups = async (pushupCount: string) => {
    // Implement your logic to send pushup data to the database here
    setIsLoading(true);
    let count = parseInt(pushupCount);
    if (isNaN(count)) count = 0;
    await pushupActions.addPushups(count).then(response => {
      if (response) {
        setIsLoading(false);
        setIsModalOpen(false);
      }
    })
    console.log(`Adding ${pushupCount} pushups to the database`);
  };


  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 36px', backgroundColor: '#141414'}}>
        <div style={{ color: '#FFFFFF'}}>
            <span>LFG! Competiton</span>
        </div>
        <div className='navlink-container'>
            <NavLink to={'/home'}>Home</NavLink>
            <NavLink to={'/players'}>Player Activity</NavLink>
            <button onClick={() => setIsModalOpen(true)}>Add +</button>
            {data && <GoogleAuth />}
        </div>
        <PushupModal
        isOpen={isModalOpen}
        isLoading={isLoading}
        onClose={() => setIsModalOpen(false)}
        onAddPushups={handleAddPushups}
      />
    </nav>
  )
}

export default DesktopNavbar