import React from 'react';
import { GoogleAuth } from '../GoogleLogin/GoogleLogin';
import './DesktopNavbar.css';
import { NavLink } from 'react-router-dom';
import { PushupModal } from '../Modals/PushupModal';
import { usePushupCounter } from '../../utilities/hooks/usePushupCounter';
import { Show, isUserLoggedIn } from '../../helpers/functional';

const DesktopNavbar = () => {
    const { isModalOpen, openModal } = usePushupCounter();
  // const handleAddPushups = async (pushupCount: string) => {
  //   // Implement your logic to send pushup data to the database here
  //   setIsLoading(true);
  //   let count = parseInt(pushupCount);
  //   if (isNaN(count)) count = 0;
  //   await pushupActions.addPushups(count).then(response => {
  //     if (response) {
  //       setIsLoading(false);
  //       setIsModalOpen(false);
  //     }
  //   })
  //   console.log(`Adding ${pushupCount} pushups to the database`);
  // };


  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 36px', backgroundColor: '#141414'}}>
        <div style={{ color: '#FFFFFF'}}>
            <span>LFG! Competiton</span>
        </div>
        <div className='navlink-container'>
            <NavLink to={'/home'}>Home</NavLink>
            <NavLink to={'/players'}>Player Activity</NavLink>
            <button onClick={openModal}>Add +</button>
            <Show when={isUserLoggedIn()}>
              <GoogleAuth />
            </Show>
        </div>
        <PushupModal isOpen={isModalOpen} />
    </nav>
    
  )
}

export default DesktopNavbar