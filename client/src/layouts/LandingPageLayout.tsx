import React from 'react';
import pic from '../assets/gym.jpg';

const LandingPageLayout = () => {
  return (
    <div style={{ position: 'relative'}}>
      <img src={pic} alt='' style={{ backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%', zIndex: '1'}} />
      <div style={{ backgroundColor: 'rgb(13, 17, 23, .65)', width: '100%', height: '100%', position: 'absolute', zIndex: '10', top: '0'}}>testing</div>
      <div style={{ zIndex: '11', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff'}}>
        Test landing page
      </div>
    </div>
  )
}

export default LandingPageLayout