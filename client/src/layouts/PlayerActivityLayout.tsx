import React from 'react'
import PlayerTable from '../components/PlayerTable/PlayerTable';
import './PlayerActivityLayout.css';
import { useLoaderData } from 'react-router';
import Header from '../components/Header/Header';
import { useActiveButton } from '../utilities/hooks/useActiveButton'
import { getCurrentMonth } from '../helpers/date';
import { sortByRank } from '../helpers/data';

const PlayerActivityLayout = () => {
    const data = useLoaderData();
    const { activeButton, activateButton } = useActiveButton('defaultButton');
  return (
    <div>
        <Header title={'Activity'} />
        {/* <div className='calendar-btn-container'>
            <button className={`${activeButton === 'day' ? 'active-filter' : ''}`} onClick={() => activateButton('day')}>Day</button>
            <button className={`${activeButton === 'week' ? 'active-filter' : ''}`} onClick={() => activateButton('week')}>Week</button>
            <button className={`${activeButton === 'month' ? 'active-filter' : ''}`} onClick={() => activateButton('month')}>Month</button>
          </div> */}
        {/* <p>Top 3 competitors for {getCurrentMonth()}</p> */}
        {/* <div className='card-container'>
          <PlayerCards />
          <PlayerCards />
          <PlayerCards />
        </div> */}
        <div className='table-container'>
          <PlayerTable data={sortByRank(data, new Date().getMonth() + 1)} />
        </div>
      </div>
  )
}

export default PlayerActivityLayout