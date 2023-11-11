import React from 'react'
import PlayerTable from '../components/Table/PlayerTable';
import './PlayerActivityLayout.css';
import { useLoaderData } from 'react-router';
import { sortByRank, sortData } from '../helpers/data';
import { CiSliderHorizontal, CiUndo } from "react-icons/ci";
import PillFilter from '../components/PillFilter/PillFilter';
import { useFilterContext } from '../utilities/hooks/useFilterContext';
import { Show, isArrayEmpty } from '../helpers/functional';
import { getMonthsInCurrentYear } from '../helpers/date';

const PlayerActivityLayout = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = useLoaderData();
    console.log(data)
    const { competitors, labels, month, sort, resetFilters } = useFilterContext();
    const mockData = sortByRank(data, new Date().getMonth() + 1);
    
    const usernames = data.map(obj => obj.username);
    // Need to implement the rest of this
    const sortingOptions = ['Highest Count This Month', 'Lowest Count This Month', 'Most Ever Completed', 'Least Ever Completed'];
    const monthOptions = getMonthsInCurrentYear(); // Sort by Month
    

    const filteredCompData = competitors && competitors.length > 0 ? data.filter(obj => competitors?.includes(obj.username)) : mockData;
    // const filteredMonthData = filteredCompData.filter()
    const filteredData = sort && sortData(filteredCompData, sort[0]) || mockData;

    const filterText = competitors?.concat(sort || []);
  return (
    <div style={{ paddingTop: '32px'}}>
      <div className="container">
        <div className="filtersSection">
          <p>Filters</p>
        </div>
        <div className="activeFiltersSection">
          <CiSliderHorizontal className="icon" />
          <p style={{ padding: '0 8px' }}>{filterText?.join(', ')}</p>
        </div>
      </div>
      <div className="clearButtonContainer">
        <Show when={!isArrayEmpty(competitors) || !isArrayEmpty(sort)}>
            <button className="clearButton" onClick={() => resetFilters()}>
              <CiUndo style={{ width: '100%', height: '100%', color: '#0057a4'}} />
            </button>
            <p className="clearButtonText">Clear all filters on the leader board.</p>
        </Show>
      </div>

      <div style={{ margin: '0 24px', borderRadius: '6px', border: '1px solid grey', overflow: 'hidden'}}>
        {/* Pass in array of all active filters */}
        <div style={{ display: 'flex', padding: '8px', backgroundColor: '#21262d'}}>
        <PillFilter filterName={'competitors'} options={usernames} filterData={competitors} singleValue={false}/>
        <PillFilter filterName={'sort'} options={sortingOptions} filterData={sort} singleValue={true}/>
        <PillFilter filterName={'month'} options={monthOptions} filterData={month} singleValue={true}/>
        {/* <PillFilter filterName={'Labels'}/>
        <PillFilter filterName={'Date'}/>
        <PillFilter filterName={'Sort'}/> */}
        </div>
        

        <div className='table-container'>
        {data !== null && <PlayerTable data={filteredData} />}
      </div>
      </div>

      
    </div>
  )
}

export default PlayerActivityLayout