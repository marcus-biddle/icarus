import React, { useEffect, useState, useMemo } from 'react'
import PlayerTable from '../components/Table/PlayerTable';
import './PlayerActivityLayout.css';
import { useLoaderData } from 'react-router';
import { CiSliderHorizontal, CiUndo } from "react-icons/ci";
import PillFilter from '../components/PillFilter/PillFilter';
import { useFilterContext } from '../utilities/hooks/useFilterContext';
import { Show, isArrayEmpty } from '../helpers/functional';

const PlayerActivityLayout = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = useLoaderData();
    const [filteredData, setFilteredData] = useState(data);
    console.log('data', filteredData);
  
    const { competitors, sort, resetFilters } = useFilterContext();

    useEffect(() => {
      if (sort?.length === 1) {
        setFilteredData(prevData => {
          return [...prevData].sort((a, b) => {
            if (!isArrayEmpty(sort) && sort?.includes(sortingOptions[0])) {
                    return b.pushupsThisMonth - a.pushupsThisMonth;
                  } else if (!isArrayEmpty(sort) && sort?.includes(sortingOptions[1])) {
                    return a.pushupsThisMonth - b.pushupsThisMonth;
                  } else {
                    return a.userName - b.userName;
                  }
          });
        });
      } else if (sort?.length === 0) {
        setFilteredData(data)
      }

      // if (!isArrayEmpty(competitors)) {
      //   setFilteredData(prevData => {
      //     return [...prevData].filter(obj => competitors?.includes(obj.userName));
      //   })
      // } else if (isArrayEmpty(competitors)) {
      //   setFilteredData(data)
      // }
    }, [sort]);
    
    const usernames = data.map(obj => obj.userName);
    const sortingOptions = ['Highest Count This Month', 'Lowest Count This Month', 'Most Ever Completed', 'Least Ever Completed'];

    // const compFilter = useMemo(() => {
    //   return originalData.filter(obj => {
    //     if (!isArrayEmpty(competitors)) {
    //       return competitors?.includes(obj.userName);
    //     } else {
    //       return true; 
    //     }
    //   });
    // }, [originalData, competitors]);

      // console.log('comp',compFilter);

      // const x = useMemo(() => {
      //   return data.sort((a, b) => {
      //     if (!isArrayEmpty(sort) && sort?.includes(sortingOptions[0])) {
      //       console.log(sortingOptions[0]);
      //       return b.pushupsThisMonth - a.pushupsThisMonth;
      //     } else if (!isArrayEmpty(sort) && sort?.includes(sortingOptions[1])) {
      //       console.log(sortingOptions[1]);
      //       return a.pushupsThisMonth - b.pushupsThisMonth;
      //     } else {
      //       return a - b;
      //     }
      //   });
      // }, [sort, sortingOptions]);

      // console.log('x', x)
    // console.log('tabledata',tableData);

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
        {/* <PillFilter filterName={'competitors'} options={usernames} filterData={competitors} singleValue={false}/> */}
        <PillFilter filterName={'sort'} options={sortingOptions} filterData={sort} singleValue={true}/>
        {/* <PillFilter filterName={'month'} options={monthOptions} filterData={month} singleValue={true}/> */}
        {/* <PillFilter filterName={'Labels'}/>
        <PillFilter filterName={'Date'}/>
        <PillFilter filterName={'Sort'}/> */}
        </div>
        

        <div className='table-container'>
        {filteredData && <PlayerTable data={filteredData} />}
      </div>
      </div>

      
    </div>
  )
}

export default PlayerActivityLayout