import React, { useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
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
      <div style={{ backgroundColor: '#141414'}}>
        <h2 style={{ textAlign: 'left', color: 'gold', margin: '0 56px', padding: '24px 0', fontSize: '40px'}}>
          Overview
        </h2>
      </div>
      
      <div style={{ display: 'flex'}}>
      <div className='chart-container'>
        <DropdownMenu getDropdownOption={setDropdownOption} />
        <div>
          <PushupTracker months={dropdownOption}/>
        </div>
      </div>
      
      <div className='changes-container'>
        {/* Make loader to grab info */}
        <RecentChanges />
      </div>
      
    </div>
    </div>
    
  )
}

export default HomeLayout