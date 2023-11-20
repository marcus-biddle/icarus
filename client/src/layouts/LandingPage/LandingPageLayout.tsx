import React from 'react';
import { PIC } from '../../assets/index'
import { useGoogleAuth } from '../../utilities/hooks/useGoogleAuth';
import './LandingPageLayout.css';
import { Show } from '../../helpers/functional';
import { useIsMobile } from '../../utilities/hooks/useIsMobile';
import { Button } from '../../components/Buttons/Button';

const LandingPageLayout = () => {
  const { handleSignin } = useGoogleAuth();
  const isMobile = useIsMobile();

  return (
    <div style={{ position: 'relative', height: '100vh'}}>
      <img src={PIC} alt='' style={{ position: 'absolute', top: '0', left: '0', width: '100%', objectFit: 'cover', height: '100vh', zIndex: '1'}} />
      <div className='block-container'>
        <div>
          <h1>Log in to Icarus2.0</h1>
          <Button onClick={() => handleSignin()}>
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>    
  )
}

export default LandingPageLayout