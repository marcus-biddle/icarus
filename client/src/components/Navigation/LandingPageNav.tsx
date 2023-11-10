import React from 'react';
import './LandingPageNav.css';
import { useGoogleAuth } from '../../utilities/hooks/useGoogleAuth';
import logo from '../../assets/logo.png'

export const LandingPageNav = () => {
  const { handleSignin } = useGoogleAuth();

  return (
    <nav className='top-navbar'>
        <img src={logo} alt='logo' style={{ width: '100px', height: '100%' }} />

        
        <button  
        style={{ width: '100px', height: '100%', padding: '8px 8px', backgroundColor: 'transparent', border: '1px solid #0057a4', color: 'white', borderRadius: '4px', letterSpacing: '.7px' }}
        onClick={() => handleSignin()}>Login</button>
    </nav>
    
  )
}