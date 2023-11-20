import React from 'react';
import './LandingPageNav.css';
import { useGoogleAuth } from '../../utilities/hooks/useGoogleAuth';
import { LOGO } from '../../assets/index'
import { Button } from '../Buttons/Button';

export const LandingPageNav = () => {
  const { handleSignin } = useGoogleAuth();

  return (
    <nav className='top-navbar'>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px'}}>
        <div style={{ position: 'relative', width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', cursor: 'pointer'}}>
            <img src={LOGO} alt='' style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }} onClick={() => navigate('/home')} />
        </div>
        <h4>Icarus2.0</h4>
      </div>
      
      <Button size={'large'} onClick={() => handleSignin()}>
        <span style={{ }}>Login</span>
      </Button>
        {/* <button  
        style={{ width: '100px', height: '100%', padding: '8px 8px', backgroundColor: 'transparent', border: '1px solid #0057a4', color: 'white', borderRadius: '4px', letterSpacing: '.7px' }}
        onClick={() => handleSignin()}>Login</button> */}
    </nav>
    
  )
}