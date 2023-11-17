import React from 'react'
import './HomeLayout.css'
import { getCurrentMonth } from '../helpers/date';
import { RecentChanges } from '../components/Boards/RecentChanges';
import { usePushupCounter } from '../utilities/hooks/usePushupCounter';
import { PushupModal } from '../components/Modals/PushupModal';
import { useLoaderData } from 'react-router';
import { showIfOrElse } from '../helpers/functional';

const HomeLayout = () => {
  const { openModal, isModalOpen, closeModal } = usePushupCounter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = useLoaderData();
  console.log('home', data)

  if (data === null) return (
    <p>data is null</p>
  )

  // const userId = data.user._id;
  // const pushups = data.pushups.filter(obj => obj._id === userId)[0];

  // const rankedPlayers = data.pushups.sort((a,b) => b.pushupsThisMonth - a.pushupsThisMonth);
  // const userRank = rankedPlayers.findIndex(player => player._id === data.user._id);
  // const highestPushupCount = data.pushups.sort((a,b) => b.pushupsThisMonth - a.pushupsThisMonth)[0].pushupsThisMonth;
  // const secondHighestPushupCount = data.pushups.sort((a,b) => b.pushupsThisMonth - a.pushupsThisMonth)[1].pushupsThisMonth || 0;
  // const addMorePushupsNum = highestPushupCount - pushups.pushupsThisMonth;
  // const keepTheLeadNum = pushups.pushupsThisMonth - secondHighestPushupCount;

  return (
    <div style={{ position: 'relative'}}>
      {/* <div>
        <h5>this is <em>italic</em></h5>
        <h4>this is <em>italic</em></h4>
        <h3>this is <em>italic</em></h3>
        <h2>this is <em>italic</em></h2>
        <h1>this is <em>italic</em></h1>
      </div> */}
      <div className='header'>
        <h4>Welcome, {data.pushups.userName}</h4>
        <h4>Experience Points: <em>{data.expPoints.total} pts</em></h4>
      </div>

      <section style={{ padding: '0 24px'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px'}}>
        <h3>Top Players</h3>
        <h5><em>in November</em></h5>
        </div>
        
        <div className='container'>
          <div className='box'>
            <h5>Player Name</h5>
            <span>1100 pushups</span>
          </div>
          <div className='box'>
            <h5>Player Name</h5>
            <span>900 pushups</span>
          </div>
          <div className='box'>
            <h5>Player Name</h5>
            <span>100 pushups</span>
          </div>
        </div>
      </section>
      
      {/* <div className='card-container'>
        <div className='display-container'>
          <p className='display-title'>Since joining</p>
          <span className='display-number'>{pushups.totalPushups}</span> <span style={{ fontSize: '14px', color: 'white'}}>pushups</span>
        </div>
        <div className='display-container'>
          <p className='display-title'>This month</p>
          <span className='display-number'>{pushups.pushupsThisMonth}</span> <span style={{ fontSize: '14px', color: 'white'}}>pushups</span>
        </div>
        <div className='display-container'>
          <p className='display-title'>Today</p>
          <span className='display-number'>{pushups.totalPushupsToday}</span> <span style={{ fontSize: '14px', color: 'white'}}>pushups</span>
        </div>
      </div>

      <div className='card-container'>
        <div className='display-container-2'>
          {showIfOrElse(addMorePushupsNum > 0)(
            <>
            <p style={{ fontSize: '12px', color: '#575f68'}}>Trying to be the David Goggins of the group?</p>
            <p style={{ fontSize: '18px',  color: 'white'}}>Complete <strong style={{ textDecoration: 'underline'}}>{addMorePushupsNum}</strong> pushups to take {getCurrentMonth()}'s leader board.</p>
            </>
          )(
            <>
          <p style={{ fontSize: '12px', color: '#575f68'}}>You're crushing the competition!</p>
          <p style={{ fontSize: '18px',  color: 'white'}}>You're leading the pack by <strong style={{ textDecoration: 'underline'}}>{keepTheLeadNum}</strong> pushups in {getCurrentMonth()}'s leader board.</p>
          </>
          )}
          <button className='add-more-btn' onClick={openModal}>Add more pushups</button>
        </div>
      </div> */}

      <div style={{ paddingBottom: '56px'}} className='card-container'>
        <h3 style={{ textAlign: 'left', width: '100%'}}>Recent Activity</h3>
        <div className='display-container-2'>
          <RecentChanges />
        </div>
      </div>
      
      
      <PushupModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default HomeLayout