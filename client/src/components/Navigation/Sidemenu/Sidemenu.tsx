// Sidemenu.js

import React, { useRef, useState, useEffect } from 'react';
import './Sidemenu.css';
import { CiCircleRemove, CiUser, CiGrid41, CiHome, CiViewList } from "react-icons/ci";
import { NavLink, useLoaderData } from 'react-router-dom';
import { useOutsideClick } from '../../../utilities/hooks/useOutsideClick';
import { userActions } from '../../../api/users';
import { useGoogleAuth } from '../../../utilities/hooks/useGoogleAuth';

const Sidemenu = ({ isOpen, setIsOpen }) => {
  const [ data, setData ] = useState<any>([]);
  const { handleSignOut } = useGoogleAuth();

  useEffect(() => {
    const fetchData = async () => {
      const response = await userActions.getAllUsers();
      setData(response);
    }

    fetchData();
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const terminateAcess = () => {
    handleSignOut();
    toggleMenu();
  }

  const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef, () => setIsOpen(false));


  return (
    <div className={`sidemenu ${isOpen ? 'open' : ''}`} ref={wrapperRef}>
      <div className="sidemenu-header">
        <p className='header'>Menu</p>
        <CiCircleRemove onClick={() => toggleMenu()} className='close-sidemenu' />
      </div>
      <div className='navigation-list'>
        <NavLink to='/home' onClick={() => toggleMenu()}>
          <CiHome />
          <span style={{ padding: '0 8px'}}>Home</span>
        </NavLink>
        <NavLink to='/leader-board' onClick={() => toggleMenu()}>
          <CiViewList />
          <span style={{ padding: '0 8px'}}>Leader Board</span>
        </NavLink>
        {/* <NavLink to='/groupchat' onClick={() => toggleMenu()}>Discussion</NavLink> */}
        {/* <NavLink to='/some-link' onClick={() => toggleMenu()}>Some Other Link</NavLink> */}
      </div>
      <hr className='divider' />
      <div className='navigation-list'>
        <h4 className='header'>History</h4>
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <NavLink to={'/charts'} onClick={() => toggleMenu()} >
                <CiGrid41 />
                <span style={{ padding: '0 8px'}}>Charts</span>
            </NavLink>
        </div>
      </div>
      <hr className='divider' />
      <div className='player-list'>
        <h4 className='header'>Players</h4>
        {/* add last active */}
        <div className='players-container'>
          {data && data.map((user) => (
            <NavLink to={`/leader-board`} onClick={() => toggleMenu()} key={user.email}>
                <CiUser />
                <span style={{ padding: '0 8px'}}>{user.username}</span>
            </NavLink>
          ))}
        </div>
      </div>
      <div className='footer'>
        <hr className='divider' />
        <button className='signout-btn' onClick={() => terminateAcess()}>Sign Out</button>
      </div>
    </div>
  );
};

export default Sidemenu;
