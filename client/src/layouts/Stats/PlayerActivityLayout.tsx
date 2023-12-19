import React, { useEffect, useState, useMemo, useRef } from 'react'
import { LeaderTable } from '../../components/Table/PlayerTable';
import './PlayerActivityLayout.css';
import { useLoaderData } from 'react-router';
import { CiSliderHorizontal, CiUndo } from "react-icons/ci";
import PillFilter from '../../components/PillFilter/PillFilter';
import { useFilterContext } from '../../utilities/hooks/useFilterContext';
import { Show, isArrayEmpty } from '../../helpers/functional';
import { GridColDef } from '@mui/x-data-grid';
import { NavLink } from 'react-router-dom';
import { LineChart } from '../../components/Charts/Line';
import { BarChart } from '../../components/Charts/Bar';
import { getCurrentMonth, getCurrentMonthNumber, getMonthName, months } from '../../helpers/date';
import { BsFire, BsDropletFill, BsBox } from "react-icons/bs";
import { useOutsideClick } from '../../utilities/hooks/useOutsideClick';
import { BsSkipBackward, BsSkipForward } from "react-icons/bs";


const PlayerActivityLayout = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = useLoaderData();
    console.log('playerAct data', data);

    const [ isDropdownOpen, setDropdownOpen ] = useState(false);
    const [ type, setType ] = useState('pushup');
    const [ month, setMonth ] = useState(getCurrentMonthNumber());

    const organizedData: any[] = [];

    data.yearActivity.forEach((entry) => {
      const { userName } = entry;
      entry.months.forEach((obj) => {
        const { eventType, month, total } = obj;
  
        const existingEntry = organizedData.find(
          (item) => item.userName === userName && item.month === month
        );
  
        if (existingEntry) {
          existingEntry[eventType] = total;
        } else {
          const newDataEntry = {
            userName,
            month,
            [eventType]: total,
          };
          organizedData.push(newDataEntry);
        }
      })
    });

    console.log('format', organizedData)

  const typeWrapperRef = useRef(null);
  useOutsideClick(typeWrapperRef, () => setDropdownOpen(false));

  const filteredAndSortedData = organizedData
  .filter(obj => obj.month === month)
  .sort((a, b) => {
    if (type === 'pullup') {
      return a.pullup - b.pullup;
    } else if (type === 'running') {
      return a.running - b.running;
    } else if (type === 'pushups') {
      return a.pushups - b.pushups;
    } else {
      return 0; // Default case, no sorting
    }
  }).slice(0,6);

  console.log('filsor', filteredAndSortedData)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'right', marginBottom: '24px', position: 'relative'}}>
        <button 
        onClick={() => setDropdownOpen(true)}
        style={{ width: '250px', padding: '8px 12px', backgroundColor: 'transparent', border: '1px solid grey', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '16px', color: 'white'}}><BsBox style={{ width: '20px', height: '100%', color: 'white'}} /> Type:</span>
          <span style={{ fontSize: '16px', color: 'white'}}>{type}</span>
        </button>
        <Show when={isDropdownOpen}>
          <ul className='type-dropdown' ref={typeWrapperRef}>
            <li onClick={() => setType('pushup')}>Push-ups</li>
            <li onClick={() => setType('pullup')}>Pull-ups</li>
            <li onClick={() => setType('running')}>Running</li>
          </ul>
        </Show>
      </div>
      
      <div className='template-container'>
        <div className='chart-container'>
            <BarChart title={`${type} Competition`} datasets={data.yearActivity} eventType={type}/>
        </div>
        <div className='topRank-container'>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px'}}>
            <span>{getMonthName(month)} Ranking</span>
            <div style={{ display: 'flex', gap: '8px'}}>
              <button className='ranking-btn' disabled={month === 1} onClick={() => setMonth(month - 1)}>
                <BsSkipBackward style={{ width: '14px', height: '100%'}}  />
              </button>
              <button className='ranking-btn' disabled={month === 12} onClick={() => setMonth(month + 1)}>
                <BsSkipForward style={{ width: '14px', height: '100%'}}  />
              </button>
            </div>
          </div>
          
          {filteredAndSortedData.map((player, index) => {
            const total = type === 'pullup' ? player.pullup : type === 'running' ? player.running : type === 'pushup' ? player.pushup : null;
            return (
              <div style={{ border: '1px solid #1E293B', padding: '8px 12px', borderRadius: '10px', margin: '8px 0', backgroundColor: "#131B2B"}}>
                <p style={{ textAlign: 'left'}}>#{index + 1}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                  <span>{player.userName}</span>
                  <span>{total}</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className='chart-container-large'>
          <h4 style={{ paddingBottom: '24px'}}>Daily Activity</h4>
          {data.todayActivity.map((player, index) => {
            const pushups = player.events.find(event => event.eventName === 'pushup');
            const pullups = player.events.find(event => event.eventName === 'pullup');
            const running = player.events.find(event => event.eventName === 'running');
            return (
              <div className='daily-activity-container' key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 24px', alignItems: 'center'}}>
                  <span style={{ fontSize: '20px'}}>{player.userName}</span>
                  <span></span>
                </div>
                <hr style={{ width: '95%', border: '1px solid #212734', boxSizing: 'border-box' }} />
                <div style={{ display: 'flex', justifyContent: 'space-evenly', paddingBottom: '8px'}}>
                  <div>
                    <span style={{ color: 'grey'}}>Push-ups:{' '}</span>
                    <span style={{ color: '#eb3f89'}}><BsFire />{pushups.total}</span>
                  </div>
                  <div>
                    <span style={{ color: 'grey'}}>Pull-ups:{' '}</span>
                    <span style={{ color: '#eb3f89'}}><BsFire />{pullups.total}</span>
                  </div>
                  <div>
                    <span style={{ color: 'grey'}}>Mileage:{' '}</span>
                    <span style={{ color: '#eb3f89'}}>{false && <BsDropletFill style={{ color: '#2196f3'}} />}<BsFire />{running.total}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    
  )
}

export default PlayerActivityLayout