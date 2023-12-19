import React from 'react';
import { PIC } from '../../assets/index'
import { useGoogleAuth } from '../../utilities/hooks/useGoogleAuth';
import './LandingPageLayout.css';
import { Show } from '../../helpers/functional';
import { useIsMobile } from '../../utilities/hooks/useIsMobile';
import { Button } from '../../components/Buttons/Button';

const LandingPageLayout = () => {
  const { handleSignin } = useGoogleAuth();
  // const isMobile = useIsMobile();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh'}}>
      <div className='login-container'>
        <h2 style={{ margin: '0' }}>Sign in.</h2>
        <button className='signin-btn' onClick={() => handleSignin()}>Sign in with Google</button>
      </div>
      {/* <div>
        <h1>Log in to Icarus2.0</h1>
        <Button onClick={() => handleSignin()}>
          Sign in with Google
        </Button>
      </div> */}
    </div>    
  )
}

export default LandingPageLayout