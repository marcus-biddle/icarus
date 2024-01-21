import React, { useState } from 'react'
import TwoColumnGrid from '../../components/Grid/TwoColumnGrid'
import './Practice.css'
import { useIsMobile } from '../../utilities/hooks/useIsMobile';
import { useDispatch, useSelector } from 'react-redux';
import { UserState, updateUserPractice } from '../../features/user/userSlice';

const Practice = () => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const isMobile = useIsMobile({});
    const dispatch = useDispatch();
    const currentEventId = useSelector((state: UserState) => state.currentUser?.currentEventId);
    const eventTotalIndex = useSelector((state: UserState) => state.currentUser?.eventTotals?.findIndex(eventTotal => eventTotal.event === currentEventId)) || -1
    const eventTotals = useSelector((state: UserState) => state.currentUser?.eventTotals);

    const handleInputChange = (e) => {
    const value = e.target.value;

    // Allow only positive numbers
    if (/^\d*\.?\d*$/.test(value)) {
      setInputValue(value);
      setError('');
    } else {
      setError('Please enter a positive number');
    }
  };

  const handleSubmit = () => {
    // Perform submit action here (e.g., send the positive number to an API)
    console.log('Submitted value:', inputValue);
    const numericValue = Number(inputValue);

    dispatch(
      updateUserPractice(numericValue)
    )

    setInputValue('');
  };

  return (
    <TwoColumnGrid showSecondColumnInMobile={true}>
        <div style={{ borderBottom: '1px solid #1E293B', paddingBottom: '8px', textAlign: 'left', paddingLeft: isMobile ? '24px' : '' }}>
            <h4 style={{ fontWeight: '700', letterSpacing: '1.12px', color: 'white'}}>Daily Practice</h4>
            <h6 style={{ marginBottom: '0', letterSpacing: '.85px'}}>Update your total - {currentEventId}</h6>
        </div>
        <div style={{ padding: isMobile ? '120px 0' : '40px 0'}}>
            <p style={{ fontSize: '18px', padding: '24px'}}>Please enter a number below for how many reps you performed.</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : ''}}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter a positive number"
                    className='practice-input'
                />
                <button onClick={handleSubmit} className='practice-input-btn'>Submit</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    </TwoColumnGrid>
  )
}

export default Practice