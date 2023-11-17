import React, { useState } from 'react'
import { DropdownMenu } from '../../components/Dropdown/ChartDropdown'
import { PushupTracker } from '../../components/PushupTracker/PushupTracker'
import { getCurrentMonth, months } from '../../helpers/date';
import './ChartLayout.css'
import { useLoaderData } from 'react-router';

const ChartLayout = () => {
    const [dropdownOption, setDropdownOption] = useState(months);
    
  return (
      <div className='template-container'>
        <div className='chart-container'>
          <DropdownMenu getDropdownOption={setDropdownOption} />
          <div style={{ height: '90%' }}>
            <PushupTracker dates={dropdownOption}/>
          </div>
        </div>
      </div>
  )
}

export default ChartLayout