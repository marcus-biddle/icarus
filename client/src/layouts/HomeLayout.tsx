import React, { useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
// import PlayerCards from '../components/PlayerCards/PlayerCards';
import './HomeLayout.css'
// import { getCurrentMonth } from '../helpers/date';
import PlayerTable from '../components/PlayerTable/PlayerTable';

const HomeLayout = () => {
    const navigate = useNavigate();
    const user = useLoaderData();
    console.log('user',user);
    

    useEffect(() => {
        if (user === null) navigate('/create');
    }, [navigate, user])

    const data = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 22 },
    ];

    const [activeFilter, setActiveFilter] = useState(0);

  return (
    <div>
      Welcome to the <span style={{ fontWeight: 700 }}>LFG!</span> competition
      <div>
        <div style={{ backgroundColor: '#141414'}}>
          <h2 style={{ textAlign: 'left', color: 'gold', margin: '0 56px', padding: '24px 0'}}>Player Activity</h2>
          <div className='calendar-btn-container'>
            <button className={`${activeFilter === 0 ? 'active-filter' : ''}`} onClick={() => setActiveFilter(0)}>Day</button>
            <button className={`${activeFilter === 1 ? 'active-filter' : ''}`} onClick={() => setActiveFilter(1)}>Week</button>
            <button className={`${activeFilter === 2 ? 'active-filter' : ''}`} onClick={() => setActiveFilter(2)}>Month</button>
          </div>
        </div>
        {/* <p>Top 3 competitors for {getCurrentMonth()}</p> */}
        {/* <div className='card-container'>
          <PlayerCards />
          <PlayerCards />
          <PlayerCards />
        </div> */}
        <div className='table-container'>
          <PlayerTable data={data} />
        </div>
      </div>
    </div>
  )
}

export default HomeLayout