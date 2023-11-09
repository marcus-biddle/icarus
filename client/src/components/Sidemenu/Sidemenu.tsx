// Sidemenu.js

import React from 'react';
import './Sidemenu.css';
import { CiCircleRemove } from "react-icons/ci";
import { NavLink } from 'react-router-dom';

const Sidemenu = ({ isOpen, setIsOpen }) => {

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidemenu ${isOpen ? 'open' : ''}`}>
      <div className="header">
        <p>Menu</p>
        <CiCircleRemove onClick={() => toggleMenu()} className='close-sidemenu' />
      </div>
      <div className='navigation-list'>
        <NavLink to='/home'>Home</NavLink>
        <NavLink to='/leader-board'>Leader Board</NavLink>
        <NavLink to='/some-link'>Discussion</NavLink>
        <NavLink to='/some-link'>Some Other Link</NavLink>
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
