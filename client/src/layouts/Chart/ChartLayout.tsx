import React, { useEffect, useState } from 'react'
import { DropdownMenu } from '../../components/Dropdown/ChartDropdown'
import { getCurrentMonth, months } from '../../helpers/date';
import './ChartLayout.css'
import { useLoaderData } from 'react-router';
import { BarChart } from '../../components/Charts/Bar';
import { pushupActions } from '../../api/events';
import { LineChart } from '../../components/Charts/Line';

const ChartLayout = () => {
  const [dropdownOption, setDropdownOption] = useState(months);
  const [allPushups, setAllPushups] = useState([]);

  console.log(allPushups);

  useEffect(() => {
    const fetchAllPushups = async () => {
      const res = await pushupActions.getMonthlyCount();
      setAllPushups(res);
    }

    fetchAllPushups();
  }, [])
    
  return (
      <div className='template-container'>
        <LineChart />
        <div className='chart-container'>
          {/* <DropdownMenu getDropdownOption={setDropdownOption} /> */}
            <BarChart title={'Pushup Competition'} datasets={allPushups}/>
        </div>
        <div className='chart-container'>
          {/* <DropdownMenu getDropdownOption={setDropdownOption} /> */}
            <BarChart title={'Pullup Competition'}  datasets={allPushups} />
        </div>
        <div className='chart-container-large'>
          {/* <DropdownMenu getDropdownOption={setDropdownOption} /> */}
            <BarChart title={'Your Progress'}  datasets={allPushups} />
        </div>
      </div>
  )
}

export default ChartLayout