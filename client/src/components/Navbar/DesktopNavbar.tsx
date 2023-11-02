import React, { useState } from 'react';
import { GoogleAuth } from '../GoogleLogin/GoogleLogin';
import './DesktopNavbar.css';
import { NavLink, useLoaderData, useNavigate } from 'react-router-dom';
import { PushupModal } from '../Modals/PushupModal';
import { pushupActions } from '../../api/pushups'
import { getCurrentMonth } from '../../helpers/date';

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
    <nav style={{ backgroundColor: '#141414' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 36px', }}>
          <div style={{ color: '#FFFFFF', paddingLeft: '24px'}}>
              <span>LFG! Competiton</span>
          </div>
          <div className='navlink-container'>
            <div>
              <NavLink to={'/home'}>Home</NavLink>
              <NavLink to={'/players'}>Player Activity</NavLink>
            </div>
              {data && <GoogleAuth />}
          </div>
      </div>
      <div style={{ textAlign: 'end', padding: '0 56px', paddingTop: '24px', textTransform: 'uppercase', color: 'grey', fontSize: '14px', letterSpacing: '1.08px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', alignContent: 'end'}}>
            <span>{getCurrentMonth()}</span>
            <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: 'transparent', color: 'gold', border: '1px solid gold', borderRadius: '24px', padding: '4px 8px', alignContent: 'center'}}>Add pushups</button>
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