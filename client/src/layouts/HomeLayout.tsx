import React, { useState } from 'react'
import './HomeLayout.css'
import { DropdownMenu } from '../components/Dropdown/ChartDropdown';
import { getCurrentMonth } from '../helpers/date';
import { RecentChanges } from '../components/Boards/RecentChanges';
import { PushupTracker } from '../components/PushupTracker/PushupTracker';
import { usePushupCounter } from '../utilities/hooks/usePushupCounter';
import { PushupModal } from '../components/Modals/PushupModal';
import { useLoaderData } from 'react-router';

const HomeLayout = () => {
  const [dropdownOption, setDropdownOption] = useState([`${getCurrentMonth()} ${new Date().getDate()}`]);
  const { openModal, isModalOpen, closeModal } = usePushupCounter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = useLoaderData();

  if (data === null) return (
    <p>data is null</p>
  )

  console.log(data.user);
  const totalPushups = data.user.totalPushups.reduce((tot, month) => tot + month.total, 0);
  const pushupsThisMonth = data.user.totalPushups.filter(obj => obj.month === new Date().getMonth() + 1)[0].total;
  console.log(data.user.totalPushups.filter(obj => obj.month === new Date().getMonth()))

  return (
    <div>
      <div className='card-container'>
        {/* Total pushups, total for the month, total for the day */}
        <div className='display-container'>
          <p className='display-title'>Since joining</p>
          <span className='display-number'>{totalPushups}</span> <span style={{ fontSize: '14px', color: 'white'}}>pushups</span>
        </div>
        <div className='display-container'>
          <p className='display-title'>This month</p>
          <span className='display-number'>{pushupsThisMonth}</span> <span style={{ fontSize: '14px', color: 'white'}}>pushups</span>
        </div>
        <div className='display-container'>
          <p className='display-title'>Today</p>
          <span className='display-number'>50</span> <span style={{ fontSize: '14px', color: 'white'}}>pushups</span>
        </div>
      </div>

      <div style={{ margin: '0 16px'}}>
        <div className='display-container'>
          <p style={{ fontSize: '12px', color: '#575f68'}}>Trying to be the David Goggins of the group?</p>
          <p style={{ fontSize: '18px',  color: 'white'}}>Complete <strong style={{ textDecoration: 'underline'}}>145</strong> pushups to take {getCurrentMonth()}'s leader board.</p>
          {/* Add pushup modal */}
          <button className='add-more-btn' onClick={openModal}>Add more pushups</button>
        </div>
      </div>

      <div style={{ margin: '32px 16px'}}>
        <h4 style={{ textAlign: 'left'}}>Recent Activity</h4>
        <div className='display-container'>
        <RecentChanges />
        </div>
      </div>
      
      {/* Make this only for each week. Makes things simpler */}
      <div style={{ display: 'flex'}}>
        <div className='chart-container'>
          <DropdownMenu getDropdownOption={setDropdownOption} />
          <div>
            <PushupTracker months={dropdownOption}/>
          </div>
        </div>
      </div>
      <PushupModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default HomeLayout