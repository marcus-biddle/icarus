import React, { useState, useEffect } from 'react'
import PlayerTable from '../components/PlayerTable/PlayerTable';
import './PlayerActivityLayout.css';
import { useLoaderData } from 'react-router';
import { getCurrentMonth } from '../helpers/date';
import { sortByRank } from '../helpers/data';

const PlayerActivityLayout = () => {
    const data = useLoaderData();
    console.log(data);
  
    const [activeFilter, setActiveFilter] = useState(0);
  return (
    <div>
        <div style={{ backgroundColor: '#141414', padding: '32px 0'}}>
          <h2 style={{ textAlign: 'left', color: 'gold', margin: '0 56px', paddingBottom: '24px', fontSize: '40px'}}>Player Activity</h2>
          {/* <div className='calendar-btn-container'>
            <button className={`${activeFilter === 0 ? 'active-filter' : ''}`} onClick={() => setActiveFilter(0)}>Day</button>
            <button className={`${activeFilter === 1 ? 'active-filter' : ''}`} onClick={() => setActiveFilter(1)}>Week</button>
            <button className={`${activeFilter === 2 ? 'active-filter' : ''}`} onClick={() => setActiveFilter(2)}>Month</button>
          </div> */}
        </div>
        <div className='table-container'>
          <PlayerTable data={sortByRank(data, new Date().getMonth() + 1)} />
        </div>
      </div>
  )
}

export default PlayerActivityLayout