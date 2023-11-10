import React, { useState } from 'react'
import PlayerTable from '../components/Table/PlayerTable';
import './PlayerActivityLayout.css';
import { useLoaderData } from 'react-router';
import Header from '../components/Header/Header';
import { useActiveButton } from '../utilities/hooks/useActiveButton'
import { getCurrentMonth } from '../helpers/date';
import { sortByRank } from '../helpers/data';
import { CiSliderHorizontal, CiUndo, CiMenuKebab, CiPlay1 } from "react-icons/ci";
import PillFilter from '../components/PillFilter/PillFilter';

const PlayerActivityLayout = () => {
    const data = useLoaderData();
    
  return (
    <div style={{ paddingTop: '32px'}}>
      <div className="container">
        <div className="filtersSection">
          <p>Filters</p>
        </div>
        <div className="activeFiltersSection">
          <CiSliderHorizontal className="icon" />
          <p style={{ padding: '0 8px' }}>Active filters</p>
        </div>
      </div>

      <div className="clearButtonContainer">
        <button className="clearButton">
          <CiUndo style={{ width: '100%', height: '100%', color: '#0057a4'}} />
        </button>
        <p className="clearButtonText">Clear all filters on the leader board.</p>
      </div>

      <div style={{ backgroundColor: '#21262d', margin: '0 24px', borderRadius: '4px', display: 'flex', padding: '8px'}}>
        {/* Pass in array of all active filters */}
        <PillFilter filterName={'Competitors'}/>
        <PillFilter filterName={'Labels'}/>
        <PillFilter filterName={'Date'}/>
        <PillFilter filterName={'Sort'}/>
      </div>
         <div className='table-container'>
         {data !== null && <PlayerTable data={sortByRank(data, new Date().getMonth() + 1)} />}
        </div>
    </div>
  )
}

export default PlayerActivityLayout