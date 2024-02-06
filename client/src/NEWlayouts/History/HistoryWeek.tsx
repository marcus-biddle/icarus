import React, { useState } from 'react'
import TwoColumnGrid from '../../components/Grid/TwoColumnGrid'
import { DynamicIcon } from '../../components/Icons/DynamicIcon'
import { GoChevronLeft, GoChevronRight, GoArrowLeft } from "react-icons/go";
import { getWeekDates } from '../../helpers/date';
import { BarChart } from '../../components/Charts/Bar';
import { useNavigate } from 'react-router';

const HistoryWeek = () => {
    const [ weekShown, setWeekShown ] = useState(getWeekDates(new Date()));
    const [ prevWeekCount, setPrevWeekCount ] = useState(1);
    const navigate = useNavigate();

    const handleWeekChange = (prev: boolean) => {
        const currentDate = new Date();
        const prevWeekStartDate = new Date(currentDate);

        if (prev) {
            prevWeekStartDate.setDate(currentDate.getDate() - (7 * prevWeekCount));
            setWeekShown(getWeekDates(prevWeekStartDate));

            setPrevWeekCount(prevWeekCount + 1);
        } else if (!prev) {
            prevWeekStartDate.setDate(currentDate.getDate() - (7 * (prevWeekCount - 1)) + 7);
            setWeekShown(getWeekDates(prevWeekStartDate));

            setPrevWeekCount(prevWeekCount - 1);
        }
    }
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const fakeUserData = [
        { id: 1, name: 'John Doe', dailyNumbers: { Sunday: 5, Monday: 8, Tuesday: 3, Wednesday: 7, Thursday: 2, Friday: 6, Saturday: 4 } },
        { id: 2, name: 'Jane Smith', dailyNumbers: { Sunday: 3, Monday: 6, Tuesday: 2, Wednesday: 4, Thursday: 1, Friday: 5, Saturday: 3 } },
        { id: 3, name: 'Bob Johnson', dailyNumbers: { Sunday: 7, Monday: 4, Tuesday: 1, Wednesday: 9, Thursday: 5, Friday: 3, Saturday: 8 } },
        { id: 4, name: 'Alice Brown', dailyNumbers: { Sunday: 2, Monday: 5, Tuesday: 8, Wednesday: 3, Thursday: 6, Friday: 4, Saturday: 1 } },
        { id: 5, name: 'Charlie Davis', dailyNumbers: { Sunday: 6, Monday: 3, Tuesday: 7, Wednesday: 2, Thursday: 8, Friday: 1, Saturday: 4 } },
        // Add more fake users as needed
      ];

  return (
    <TwoColumnGrid showSecondColumnInMobile={true}>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center', borderBottom: '1px solid #1E293B', paddingBottom: '8px'}}>
            <button className='date-btn' onClick={() => navigate('/history')}>
                <DynamicIcon icon={GoArrowLeft} width='40px' height='40px' color='white' />
            </button>
            <h4 style={{ margin: '0', fontWeight: '700', letterSpacing: '.85px' }}>History By Week</h4>
        </div>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', margin: '32px 0' }}>
            <button onClick={() => handleWeekChange(true)} className='date-btn'>
                <DynamicIcon icon={GoChevronLeft} width='40px' height='40px' />
            </button>
            
            <div style={{ minWidth: '300px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <span style={{ fontWeight: '700', fontSize: '18px' }}>{weekShown.startDate}</span>
                <span style={{ fontWeight: '300', fontSize: '15px', textTransform: 'uppercase' }}>to</span>
                <span style={{ fontWeight: '700', fontSize: '18px' }}>{weekShown.endDate}</span>
            </div>

            <button disabled={prevWeekCount < 2 ? true : false} onClick={() => handleWeekChange(false)} className='date-btn'>
                <DynamicIcon icon={GoChevronRight} width='40px' height='40px' />
            </button>
        </div>
        <div className='container' style={{ height: '40vh'}}>
            <BarChart title={''} length={daysOfWeek} datasets={[
                {label: 'test', data: ['100', '200', '300'], backgroundColor: '#fefefe'},
                {label: 'test2', data: ['200', '300', '100'], backgroundColor: '#000000'},
                ]} eventType={''}
            />
        </div>
        <div className='container' style={{ margin: '24px 0', overflowX: 'auto', maxWidth: '100vw'}}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ }}>
                        <th style={{ backgroundColor: 'transparent', position: 'static', padding: '4px'}}>User</th>
                        {daysOfWeek.map(day => (
                            <th key={day} style={{ backgroundColor: 'transparent', position: 'static', padding: '4px'}}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {fakeUserData.map(user => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        {daysOfWeek.map(day => (
                        <td key={`${user.id}-${day}`}>{user.dailyNumbers[day]}</td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </TwoColumnGrid>
  )
}

export default HistoryWeek