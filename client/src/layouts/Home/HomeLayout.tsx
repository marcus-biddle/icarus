import React, { useRef, useState } from 'react'
import './HomeLayout.css'
import { formatDateString, getCurrentMonth, months } from '../../helpers/date';
import { useLoaderData } from 'react-router';
import { Show, isArrayEmpty, showIfOrElse } from '../../helpers/functional';
import { BsSortDown, BsFire, BsSortNumericDown, BsArrowDownShort, BsDropletFill } from "react-icons/bs";
import { useIsMobile } from '../../utilities/hooks/useIsMobile';
import { useOutsideClick } from '../../utilities/hooks/useOutsideClick';
import { useAuthCheck } from '../../utilities/hooks/useAuthCheck';
import { formatEventType } from '../../helpers/format';

const HomeLayout = () => {
  const data: any = useLoaderData();
  
  const [ isSortDropdownOpen, setSortDropdownOpen ] = useState(false);
  const [ isRangeDropdownOpen, setRangeDropdownOpen ] = useState(false);
  const [ rangeType, setRangeType ] = useState('total');
  const [ sortOption, setSortOption ] = useState('pushup');
  const isMobile = useIsMobile({});

  const events = data.events.sort((a, b) => {
    const eventNameA = a.events.find(event => event.eventName === sortOption);
    const eventNameB = b.events.find(event => event.eventName === sortOption);
  
    // Check if eventNameA and eventNameB are defined to avoid errors
    if (eventNameA && eventNameB) {
      // Sort in descending order (highest total first)
      return eventNameB.total - eventNameA.total;
    } else {
      // Handle the case where 'pushup' event is not present for both entries
      return 0;
    }
  });

  console.log('home', data.logs)

  const sortWrapperRef = useRef(null);
  useOutsideClick(sortWrapperRef, () => setSortDropdownOpen(false));

  const monthWrapperRef = useRef(null);
  useOutsideClick(monthWrapperRef, () => setRangeDropdownOpen(false));

  const itemsPerPageLimit = 5;
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageLimit);

  const displayedEvents = events.slice(0, itemsPerPage + 1);

  const handleLoadMore = () => {
    setItemsPerPage(itemsPerPage + itemsPerPageLimit)
  };

  return (
    <div className={!isMobile ? 'home-layout' : 'home-layout-mobile'}>
      <div style={{ maxWidth: '700px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', gap: '16px' }}>
          {/* <div style={{ position: 'relative'}}>
            <button className='sort-btn' onClick={() => setRangeDropdownOpen(true)}>
              <BsSortNumericDown style={{ width: '20px', height: '100%'}} />
              <span style={{ fontSize: '16px'}}>Range</span>
            </button>
            <Show when={isRangeDropdownOpen}>
                <ul className='sort-dropdown' ref={monthWrapperRef}>
                  <li onClick={() => setRangeType('total')}>Total</li>
                  <li onClick={() => setRangeType('today')}>Today</li>
                  <li onClick={() => setRangeType('month')}>This Month</li>
                </ul>
            </Show>
          </div> */}
          <div>
            <h4 style={{ color: '#A0AEC0', fontSize: '15px'}}>Max Ranking: <span style={{ fontWeight: '400', color: '#A0AEC0', fontSize: '18px'}}>{formatEventType(sortOption)}</span></h4>
          </div>
          
          <div style={{ position: 'relative'}}>
            <button className='sort-btn' onClick={() => setSortDropdownOpen(true)}>
              <BsSortDown style={{ width: '20px', height: '100%'}} />
              <span style={{ fontSize: '16px'}}>Sort</span>
            </button>
            <Show when={isSortDropdownOpen}>
                <ul className='sort-dropdown' ref={sortWrapperRef}>
                  {/* <li>Overall</li> */}
                  <li onClick={() => setSortOption('pushup')}>Push-ups</li>
                  <li onClick={() => setSortOption('pullup')}>Pull-ups</li>
                  <li onClick={() => setSortOption('running')}>Running</li>
                </ul>
            </Show>
          </div>
        </div>
        
        <ul className='player-list-container'>
          {displayedEvents.map((player, index) => {
            const pushups = player.events.find(event => event.eventName === 'pushup');
            const pullups = player.events.find(event => event.eventName === 'pullup');
            const running = player.events.find(event => event.eventName === 'running');
            return (
              <li key={index}>
                <p style={{ textAlign: 'left', padding: '6px 0', fontSize: '14px' }}>#{index + 1}</p>
                <h3 style={{ textAlign: 'left'}}>{player.userName}</h3>
                <hr style={{ width: '100%', border: '1px solid #212734'}} />
                <div style={{ display: 'flex', justifyContent: 'space-evenly', paddingBottom: '10px'}}>
                  <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                    <span style={{ color: '#A0AEC0', paddingRight: '2px' }}>Push-ups:</span>
                    <span style={{ minWidth: '50px'}}>{pushups ? <div><BsFire style={{ color: '#eb3f89'}} />{pushups.total}</div> : <div><BsDropletFill style={{ color: '#2196f3'}} />0</div>}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                    <span style={{ color: '#A0AEC0', padding: '0 8px' }}>Pull-ups:{' '}</span>
                    <span style={{ minWidth: '50px'}}>{pullups ? <div><BsFire style={{ color: '#eb3f89'}} />{pullups.total}</div> : <div><BsDropletFill style={{ color: '#2196f3'}} />0</div>}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                    <span style={{ color: '#A0AEC0', paddingRight: '8px' }}>Mileage:{' '}</span>
                    <span style={{ minWidth: '50px'}}>{running ? <div><BsFire style={{ color: '#eb3f89'}} />{running.total}</div> : <div><BsDropletFill style={{ color: '#2196f3'}} />0</div>}</span>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0' }}>
          {itemsPerPage < events.length && (
            <button className='load-btn' onClick={handleLoadMore}>
              <BsArrowDownShort style={{ width: '20px', height: '100%'}} />
              <span style={{ fontWeight: '400', fontSize: '14px' }}>Load More</span>
            </button>
          )}
        </div>
      </div>
      <Show when={!isMobile}>
        <div className='recent-container'>
          <ul className='scrollbar'>
            {data.logs.length === 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <p style={{ color: '#A0AEC0'}}>When a competitor adds an event, it will be shown here.</p>
              </div>
            )}
            {data.logs.map((item, index) => (
              <li key={index}>
                <p>{formatDateString(item.timestamp)}</p>
                <span>{item.action} </span>
              </li>
            ))}
          </ul>
        </div>
      </Show>
      
    </div>
  )
}

export default HomeLayout