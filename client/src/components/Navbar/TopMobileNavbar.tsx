import React, { useEffect, useState } from 'react';
import './TopMobileNavbar.css';
import { Show, isArrayEmpty, showIfOrElse } from '../../helpers/functional';
import { recentChangesActions } from '../../api/recentChanges';
import { CiViewTimeline } from "react-icons/ci";

const TopMobileNavbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [data, setData] = useState([]);
  const emptyDataMsg = 'No activity in the last week.'

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
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
        <button className={`${isDropdownOpen ? 'navbar-button-active' : "navbar-button"}`} onClick={toggleDropdown}>
          <CiViewTimeline style={{ width: '100%', height: '100%'}}/>
        </button>
        <Show when={isDropdownOpen}>
          <div className="dropdown">
              {showIfOrElse(isArrayEmpty(data))(<p>{emptyDataMsg}</p>)(
                  <>
                  <h3>Recent Events</h3>
                    <ul>
                        {data.map((item: { action: string }, index) => (
                            <li key={index}>
                            {item.action} 
                            </li>
                        ))}
                    </ul>
                  </>
              )}
          </div>
        </Show>
      </div>
      
    
  );
};

export default TopMobileNavbar;
