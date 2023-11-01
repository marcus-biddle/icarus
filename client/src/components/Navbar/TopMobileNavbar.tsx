import React, { useEffect, useState } from 'react';
import './TopMobileNavbar.css';
import { Show } from '../../helpers/functional';
import { recentChangesActions } from '../../api/recentChanges';

const TopMobileNavbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [data, setData] = useState([]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
    console.log(isDropdownOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
        const response = await recentChangesActions.getAllRecentChanges();
        setData(response);
    }

    fetchData();
    
  }, [])

  return (
    <div className="top-navbar">
      <div className="navbar-icon">Icon</div>
      <button className="navbar-button" onClick={toggleDropdown}>Recent Changes</button>
      <Show when={isDropdownOpen}>
        <div className="dropdown">
        {data.length === 0 ? (
        <p>No activity in the last week.</p>
      ) : (
        <ul>
          {data.map((item: { action: string }, index) => (
            <li key={index}>
              {item.action} 
            </li>
          ))}
          
        </ul>
      )}
        </div>
      </Show>
    </div>
  );
};

export default TopMobileNavbar;
