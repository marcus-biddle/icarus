import React from 'react';
import { JOGGING } from '../../assets/index'
import { useGoogleAuth } from '../../utilities/hooks/useGoogleAuth';
import './LandingPageLayout.css';
import { Show } from '../../helpers/functional';
import { useIsMobile } from '../../utilities/hooks/useIsMobile';

const LandingPageLayout = () => {
  const { handleSignin } = useGoogleAuth();
  const isMobile = useIsMobile();

  return (
    <>
    <div className="lp-container">
      <img src={JOGGING} alt='' className="background-image" />
      <div className="overlay"></div>
      <Show when={!isMobile}>
        <div className="content-container">
          <div className="login-inner-content">
            <p className="disclaimer">Currently only supports one activity - pushups.</p>
            <h3 className="login-title">Let's F* Go</h3>
            <p className="login-description">An app to compete against friends and family.</p>
            <div style={{ margin: '42px'}}>
              <p className="sign-in-message">Please sign in through Google to begin.</p>
              <button
                className="sign-in-button"
                onClick={() => handleSignin()}
              >
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </Show>
      
    </div>
    <Show when={isMobile}>
      <div className="content-container-mobile">
        <div className="login-inner-content">
          <p className="disclaimer">Currently only supports one activity - pushups.</p>
          <h3 className="login-title">Let's F* Go</h3>
          <p className="login-description">An app to compete against friends and family.</p>
          <div style={{ margin: '42px'}}>
            <p className="sign-in-message">Please sign in through Google to begin.</p>
            <button
              className="sign-in-button"
              onClick={() => handleSignin()}
            >
              Login with Google
            </button>
          </div>
        </div>
      </div>
      </Show>
    </>
    
  )
}

export default LandingPageLayout