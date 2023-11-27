import React from 'react';
import './LandingPageNav.css';
import { useGoogleAuth } from '../../utilities/hooks/useGoogleAuth';
import { LOGO } from '../../assets/index'
import { Button } from '../Buttons/Button';

export const LandingPageNav = () => {
  const { handleSignin } = useGoogleAuth();

  return (
    <nav className='landing-nav'>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px'}}>
        <div style={{ position: 'relative', width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', cursor: 'pointer'}}>
            <img src={LOGO} alt='' style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }} onClick={() => navigate('/home')} />
        </div>
        <h5>Icarus</h5>
      </div>

      <ul style={{ display: 'flex', listStyle: 'none', gap: '32px', justifyContent: 'space-around'}}>
        <li>Features</li>
        <li>Contests</li>
        <li>About</li>
        <li>FAQ</li>
      </ul>
      
      {/* <Button size={'large'} onClick={() => handleSignin()}>
        <span style={{ }}>Login</span>
      </Button> */}
        {/* <button  
        style={{ width: '100px', height: '100%', padding: '8px 8px', backgroundColor: 'transparent', border: '1px solid #0057a4', color: 'white', borderRadius: '4px', letterSpacing: '.7px' }}
        onClick={() => handleSignin()}>Login</button> */}
    </nav>
    
  )
}