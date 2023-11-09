import React, { useState } from 'react'
// import PlayerCards from '../components/PlayerCards/PlayerCards';
import './HomeLayout.css'
import { DropdownMenu } from '../components/Dropdown/ChartDropdown';
import { getCurrentMonth } from '../helpers/date';
import { RecentChanges } from '../components/Boards/RecentChanges';
import { PushupTracker } from '../components/PushupTracker/PushupTracker';
// import { getCurrentMonth } from '../helpers/date';

const HomeLayout = () => {
  const [dropdownOption, setDropdownOption] = useState([`${getCurrentMonth()} ${new Date().getDate()}`]);
  return (
    <div>
      <div className='card-container'>
        {/* Total pushups, total for the month, total for the day */}
        <div className='display-container'>
          <p className='display-title'>Since joining</p>
          <span className='display-number'>2,000</span> <span style={{ fontSize: '14px'}}>pushups</span>
        </div>
        <div className='display-container'>
          <p className='display-title'>This month</p>
          <span className='display-number'>500</span> <span style={{ fontSize: '14px'}}>pushups</span>
        </div>
        <div className='display-container'>
          <p className='display-title'>Today</p>
          <span className='display-number'>50</span> <span style={{ fontSize: '14px'}}>pushups</span>
        </div>
      </div>

      <div style={{ margin: '0 16px'}}>
        <div className='display-container'>
          <p style={{ fontSize: '12px'}}>Trying to be the David Goggins of the group?</p>
          <p style={{ fontSize: '18px'}}>Complete 145 pushups to take the leaderboard.</p>
          {/* Add pushup modal */}
          <button className='add-more-btn'>Add more pushups</button>
        </div>
      </div>

      <div style={{ margin: '32px 16px'}}>
        <h4 style={{ textAlign: 'left'}}>Recent Activity</h4>
        <div className='display-container'>
        <RecentChanges />
        </div>
      </div>
      
      {/* Make this only for each week. Makes things simpler */}
      <div style={{ display: 'flex'}}>
        <div className='chart-container'>
          <DropdownMenu getDropdownOption={setDropdownOption} />
          <div>
            <PushupTracker months={dropdownOption}/>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HomeLayout