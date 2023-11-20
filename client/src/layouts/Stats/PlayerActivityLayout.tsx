import React, { useEffect, useState, useMemo } from 'react'
import PlayerTable from '../../components/Table/PlayerTable';
import './PlayerActivityLayout.css';
import { useLoaderData } from 'react-router';
import { CiSliderHorizontal, CiUndo } from "react-icons/ci";
import PillFilter from '../../components/PillFilter/PillFilter';
import { useFilterContext } from '../../utilities/hooks/useFilterContext';
import { Show, isArrayEmpty } from '../../helpers/functional';

// Players - totals -> wins, exp, pushups, running, pullups
// Players - month -> ^ tesr
// Wins -> players, pushups, running, pullups
// Challenges -> each battle
// Activities -> participation count, combined total
const PlayerActivityLayout = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = useLoaderData();
    console.log('playerAct data', data);
  
    const [selectedTab, setSelectedTab] = useState('players');

    const handleTabChange = (tab) => {
      setSelectedTab(tab);
    };

  return (
    <div style={{ paddingTop: '32px'}}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
        <div className='tabs'>
          <input type='radio' id="players" name="tabs" checked={selectedTab === 'players'} onChange={() => handleTabChange('players')} />
          <label className='tab' htmlFor='players'>Players</label>
          <input type='radio' id="wins" name='tabs' checked={selectedTab === 'wins'} onChange={() => handleTabChange('wins')}/>
          <label className='tab' htmlFor='wins'>Wins</label>
          <input type='radio' id="activities" name='tabs' checked={selectedTab === 'activities'} onChange={() => handleTabChange('activities')}/>
          <label className='tab' htmlFor='activities'>Activities</label>
          <input type='radio' id="challenges" name='tabs' checked={selectedTab === 'challenges'} onChange={() => handleTabChange('challenges')}/>
          <label className='tab' htmlFor='challenges'>Challenges</label>
          <span className='slider' /> 
        </div>
      </div>
      <Show when={selectedTab === 'players'}>
          <section className='table__body'>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Players</th>
                  <th>Wins</th>
                  <th>Points</th>
                  <th>Pushups</th>
                  <th>Pullups</th>
                  <th>Running</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>1</td>
                    <td>Marcus Biddle</td>
                    <td>3</td>
                    <td>300</td>
                    <td>1000</td>
                    <td>1000</td>
                    <td>100 miles</td>
                  </tr>
              </tbody>
            </table>
          </section>
      </Show>

      <Show when={selectedTab === 'wins'}>
          <section className='table__body'>
            <table>
              <thead>
                <tr>
                  <th>Players</th>
                  <th>Pushup WInner</th>
                  <th>Pullup Winner</th>
                  <th>Running Winner</th>
                  <th>Overall Winner</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>Marcus Biddle</td>
                    <td>3</td>
                    <td>0</td>
                    <td>10</td>
                    <td>0</td>
                  </tr>
              </tbody>
            </table>
          </section>
      </Show>

      <Show when={selectedTab === 'activities'}>
          <section className='table__body'>
            <table>
              <thead>
                <tr>
                  <th>Pushup Entries</th>
                  <th>Pullup Entries</th>
                  <th>Running Entries</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>210</td>
                    <td>10</td>
                    <td>30</td>
                  </tr>
              </tbody>
            </table>
          </section>
      </Show>
      
      {/* <div className="container">
        <div className="filtersSection">
          <p>Filters</p>
        </div>
        <div className="activeFiltersSection">
          <CiSliderHorizontal className="icon" />
          <p style={{ padding: '0 8px' }}>{filterText?.join(', ')}</p>
        </div>
      </div> */}
      {/* <div className="clearButtonContainer">
        <Show when={!isArrayEmpty(competitors) || !isArrayEmpty(sort)}>
            <button className="clearButton" onClick={() => resetFilters()}>
              <CiUndo style={{ width: '100%', height: '100%', color: '#0057a4'}} />
            </button>
            <p className="clearButtonText">Clear all filters on the leader board.</p>
        </Show>
      </div> */}

      {/* <div style={{ margin: '0 24px', borderRadius: '6px', border: '1px solid grey', overflow: 'hidden'}}> */}
        {/* Pass in array of all active filters */}
        {/* <div style={{ display: 'flex', padding: '8px', backgroundColor: '#21262d'}}> */}
        {/* <PillFilter filterName={'competitors'} options={usernames} filterData={competitors} singleValue={false}/> */}
        {/* <PillFilter filterName={'sort'} options={sortingOptions} filterData={sort} singleValue={true}/> */}
        {/* <PillFilter filterName={'month'} options={monthOptions} filterData={month} singleValue={true}/> */}
        {/* <PillFilter filterName={'Labels'}/>
        <PillFilter filterName={'Date'}/>
        <PillFilter filterName={'Sort'}/> */}
        {/* </div> */}
        

        {/* <div className='table-container'>
        {filteredData && <PlayerTable data={filteredData} />}
      </div> */}
      {/* </div> */}

      
    </div>
  )
}

export default PlayerActivityLayout