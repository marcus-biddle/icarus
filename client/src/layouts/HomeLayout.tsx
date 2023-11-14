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
      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        {/* this might turn an array actually... */}
        {/* <h2 className='welcome-header'>Welcome, {data.pushups.userName}</h2> */}
        {/* <h2 className='welcome-header'>Exp Points: {data.expPoints.total}</h2> */}
      </div>
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
        <h4 style={{ textAlign: 'left', fontSize: '16px', letterSpacing: '.5px', width: '100%'}}>Recent Activity</h4>
        <div className='display-container-2'>
        <RecentChanges />
        </div>
      </div>
      
      
      <PushupModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default HomeLayout