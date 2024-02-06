import React, { useEffect, useState } from 'react'
import TwoColumnGrid from '../../components/Grid/TwoColumnGrid'
import { DynamicIcon } from '../../components/Icons/DynamicIcon'
import { GoChevronLeft, GoChevronRight, GoArrowLeft } from "react-icons/go";
import { getWeekDates, months } from '../../helpers/date';
import { BarChart } from '../../components/Charts/Bar';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { userActions } from '../../api/users';

const weekOfMonth = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Update eventually for year and month
const transformMonthSummaries = (userMonthSummaries, currentMonth) => {
    if (!userMonthSummaries) return null;
    return userMonthSummaries.map((user, index) => {
      const data = user.monthSummaries.filter(summary => summary.monthName === currentMonth)[0];
      if (!data) return;

      console.log('data', data);
      const updatedData = data.weeks.map(week => week.count)
      const backgroundColor = getRandomColor();
  
      return {
        label: user.name,
        data: updatedData,
        backgroundColor,
      };
    }).filter((user) => user && user !== undefined);
  };

  //Broke year history???
const HistoryMonth = () => {
    const currentDate = new Date();
    const currentMonthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);
    const monthIndex = months.findIndex(month => month === currentMonthName);

    const [ currentMonthIndex, setCurrentMonthIndex] = useState(monthIndex)
    const [usersMonthSummaries, setUsersMonthSummaries] = useState(null);
    console.log('userSummaries', (usersMonthSummaries));
    const navigate = useNavigate();
    const eventId = useSelector((state: RootState) => state.user.currentUser?.currentEventId) || '';
    console.log(eventId);

    const handleWeekChange = (prev: boolean) => {
        if (prev) {
            setCurrentMonthIndex(currentMonthIndex - 1);
        } else if (!prev) {
            setCurrentMonthIndex(currentMonthIndex + 1);
        }
    }

      useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await userActions.fetchUsersMonthSummaries(eventId);
                // eventually move the inner function to the bar graph?
                setUsersMonthSummaries(transformMonthSummaries(data, months[currentMonthIndex]));
            } catch (error) {
                console.error('Error fetching user month summaries:', error);
            }
        };

        fetchData();
      }, [currentMonthIndex, eventId])

  return (
    <TwoColumnGrid showSecondColumnInMobile={true}>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center', borderBottom: '1px solid #1E293B', paddingBottom: '8px'}}>
            <button className='date-btn' onClick={() => navigate('/history')}>
                <DynamicIcon icon={GoArrowLeft} width='40px' height='40px' color='white' />
            </button>
            <h4 style={{ margin: '0', fontWeight: '700', letterSpacing: '.85px' }}>History By Month</h4>
        </div>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', margin: '32px 0' }}>
            <button disabled={months[currentMonthIndex] === 'January' ? true : false} onClick={() => handleWeekChange(true)} className='date-btn'>
                <DynamicIcon icon={GoChevronLeft} width='40px' height='40px' />
            </button>
            
            <div style={{ minWidth: '300px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <span style={{ fontWeight: '700', fontSize: '18px' }}>{months[currentMonthIndex]}</span>
            </div>

            <button disabled={months[currentMonthIndex] === 'December' ? true : false} onClick={() => handleWeekChange(false)} className='date-btn'>
                <DynamicIcon icon={GoChevronRight} width='40px' height='40px' />
            </button>
        </div>
        <div className='container' style={{ height: '40vh'}}>
            <BarChart title={''} length={weekOfMonth} datasets={usersMonthSummaries || []} eventType={''}
            />
        </div>
        {/* <div className='container' style={{ margin: '24px 0', overflowX: 'auto', maxWidth: '100vw'}}>
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
                        <td key={`${user.id}-${day}`}>{user.xpSummaries[day]}</td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>
        </div> */}
    </TwoColumnGrid>
  )
}

export default HistoryMonth