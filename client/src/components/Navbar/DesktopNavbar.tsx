import React, { useEffect } from 'react';
import { GoogleAuth } from '../GoogleLogin/GoogleLogin';
import './DesktopNavbar.css';
import { NavLink, useLoaderData, useNavigate } from 'react-router-dom';

const DesktopNavbar = () => {
    const navigate = useNavigate();
    const user = useLoaderData();
    console.log('user',user);
    

    useEffect(() => {
        if (user === null) navigate('/create');
    }, [navigate, user])

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 36px', backgroundColor: '#141414'}}>
        <div style={{ color: '#FFFFFF'}}>
            <span>LFG! Competiton</span>
        </div>
        <div className='navlink-container'>
            <NavLink to={'/home'}>Home</NavLink>
            <NavLink to={'/players'}>Player Activity</NavLink>
            <NavLink to={'/user'}>Add +</NavLink>
            <GoogleAuth />
        </div>
        
    </nav>
  )
}

export default DesktopNavbar