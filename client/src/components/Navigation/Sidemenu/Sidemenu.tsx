import React, { useRef, useState, useEffect } from 'react';
import './Sidemenu.css';
import { CiCloudSun, CiBookmark, CiGrid41, CiHome, CiViewList, CiChat1, CiLogout, CiGlobe } from "react-icons/ci";
import { NavLink, useNavigate } from 'react-router-dom';
import { useOutsideClick } from '../../../utilities/hooks/useOutsideClick';
import { userActions } from '../../../api/users';
import { useGoogleAuth } from '../../../utilities/hooks/useGoogleAuth';
import { MENU } from '../../../assets/index';
import { BsChevronDoubleRight } from "react-icons/bs";

const Sidemenu = ({ isOpen, setIsOpen }) => {
  // const [ data, setData ] = useState<any>([]);
  const { handleSignOut } = useGoogleAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await userActions.getAllUsers();
  //     setData(response);
  //   }

  //   fetchData();
  // }, [])

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
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '16px' }}>
        <h3 style={{ fontWeight: '300', textTransform: 'uppercase', fontSize: '18px', letterSpacing: '5px', color: 'white' }}>Icarus</h3>
      </div>
      <section className="sidemenu-header">
        <div style={{ position: 'relative', width: '50px', height: '50px' }}>
            <img src={MENU} alt='' style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }} onClick={() => navigate('/home')} />
        </div>
        <p style={{ fontSize: '14px', fontStyle: 'italic', paddingLeft: '8px', display: 'flex', alignItems: 'flex-end'}}>“Let us see how high we can fly before <br /> the sun melts the wax in our wings.”</p>
        
      </section>

      <section>
       
      </section>

      <div style={{ position: 'relative'}}>
        <div className='section-title'>
          <span>Directory</span>
        </div>
        <hr className='divider' />
      </div>

      <section className='menu-group'>
        <NavLink to='/home' onClick={() => toggleMenu()}>
          <CiHome className='menu-icon'/>
          <span style={{ padding: '0 8px'}}>Home</span>
        </NavLink>
        <NavLink to='/leader-board' onClick={() => toggleMenu()}>
          <CiViewList className='menu-icon'/>
          <span style={{ padding: '0 8px'}}>Leader Board</span>
        </NavLink>
        <NavLink to='/chat' onClick={() => toggleMenu()}>
          <CiChat1 className='menu-icon'/>
          <span style={{ padding: '0 8px'}}>Chat Room</span>
        </NavLink>
        <NavLink to='/duo/home' onClick={() => toggleMenu()}>
          <CiChat1 className='menu-icon'/>
          <span style={{ padding: '0 8px'}}>Duo</span>
        </NavLink>
        {/* <NavLink to={'/charts'} onClick={() => toggleMenu()} >
            <CiGrid41 className='menu-icon'/>
            <span style={{ padding: '0 8px'}}>Charts</span>
        </NavLink> */}
        {/* <NavLink to={'/charts'} onClick={() => toggleMenu()} >
            <CiGlobe className='menu-icon'/>
            <span style={{ padding: '0 8px'}}>Arena</span>
        </NavLink> */}
       </section>
      
       {/* <div style={{ position: 'relative'}}>
        <div className='section-title'>
          <span>Stats</span>
        </div>
        <hr className='divider' />
      </div>
      
      <section className='menu-group-2'>
        <div>
          <span>Experience Points:</span>
          <span>100</span>
        </div>
        <div>
          <span>Challenges Won:</span>
          <span>100</span>
        </div>
        <div>
          <span>Monthly Rank:</span>
          <span>1st</span>
        </div>
        
          
      </section> */}
      
      {/* Add functionality to Join groups, might  want to creat a function to create your own group too. */}
      {/* <div style={{ position: 'relative'}}>
        <div className='section-title'>
          <span>Groups</span>
        </div>
        <hr className='divider' />
      </div>

       <section className='menu-group'>
          {data && data.map((user) => (
            <NavLink to={`/leader-board`} onClick={() => toggleMenu()} key={user.email}>
                <CiBookmark className='menu-icon' />
                <span style={{ padding: '0 8px'}}>{user.username}</span>
            </NavLink>
          ))}
      </section> */}

      <div style={{ position: 'absolute', bottom: '0', width: '100%'}}>
        <div style={{ position: 'relative'}}>
          <div className='section-title'>
            <span>Exit</span>
          </div>
          <hr className='divider' />
        </div>

        <section className='menu-group'>
          <NavLink to={`/`} onClick={() => terminateAcess()}>
            <CiLogout className='menu-icon' />
            <span style={{ padding: '0 8px'}}>Logout</span>
          </NavLink>
        </section>
      </div>
      
      <div style={{ position: 'absolute', top: '12px', right: '16px', width: '100px', display: 'flex', justifyContent: 'right', height: '30px', cursor: 'pointer'}} onClick={() => setIsOpen(false)}>
        <BsChevronDoubleRight style={{ width: '20px', height: '100%'}} />
      </div>
      
    </div>
  );
};

export default Sidemenu;
