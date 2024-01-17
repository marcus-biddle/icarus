import React from 'react';
import { useGoogleAuth } from '../../utilities/hooks/useGoogleAuth';
import './LandingPageLayout.css';

const LandingPageLayout = () => {
  const { handleSignin } = useGoogleAuth();
  // const isMobile = useIsMobile({});

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh'}}>
      <div className='login-container'>
        <h2 style={{ margin: '0' }}>Sign in.</h2>
        <button className='signin-btn' onClick={() => handleSignin()}>Sign in with Google</button>
      </div>
    </div>    
  )
}

export default LandingPageLayout