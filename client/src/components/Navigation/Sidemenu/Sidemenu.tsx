// Sidemenu.js

import React, { useRef } from 'react';
import './Sidemenu.css';
import { CiCircleRemove } from "react-icons/ci";
import { NavLink } from 'react-router-dom';
import { useOutsideClick } from '../../../utilities/hooks/useOutsideClick';

const Sidemenu = ({ isOpen, setIsOpen }) => {

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef, () => setIsOpen(false));


  return (
    <div className={`sidemenu ${isOpen ? 'open' : ''}`} ref={wrapperRef}>
      <div className="header">
        <p>Menu</p>
        <CiCircleRemove onClick={() => toggleMenu()} className='close-sidemenu' />
      </div>
      <div className='navigation-list'>
        <NavLink to='/home' onClick={() => toggleMenu()}>Home</NavLink>
        <NavLink to='/leader-board' onClick={() => toggleMenu()}>Leader Board</NavLink>
        <NavLink to='/some-link' onClick={() => toggleMenu()}>Discussion</NavLink>
        <NavLink to='/some-link' onClick={() => toggleMenu()}>Some Other Link</NavLink>
      </div>
      <hr style={{ borderStyle: 'solid', borderWidth: '.5px'}} />
      <div style={{ textAlign: 'left'}}>
        <p>Charts</p>
        <p>Ranking</p>
      </div>
      <hr style={{ borderStyle: 'solid', borderWidth: '.5px'}} />
      <div className='player-list'>
        <h4>Players</h4>
        <p>Player 1</p>
        <p>Player 2</p>
        <p>Player 3</p>
      </div>
    </div>
  );
};

export default Sidemenu;
