import React, { useEffect, useState } from 'react'
import TwoColumnGrid from '../../components/Grid/TwoColumnGrid'
import { DynamicIcon } from '../../components/Icons/DynamicIcon'
import { GoChevronLeft, GoChevronRight, GoArrowLeft } from "react-icons/go";
import { getWeekDates } from '../../helpers/date';
import { BarChart } from '../../components/Charts/Bar';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { userActions } from '../../api/users';

const monthsOfYear = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

const transformYearSummaries = (userYearSummaries, year) => {
    if (!userYearSummaries) return null;
    return userYearSummaries.map((user, index) => {
      const data = user.yearSummaries.filter(summary => summary.dateYear === year)[0];
      if (!data) return;

      console.log('data', data);
      const updatedData = data.months.map(month => month.count)
      const backgroundColor = getRandomColor();
  
      return {
        label: user.name,
        data: updatedData,
        backgroundColor,
      };
    }).filter((user) => user && user !== undefined);
  };

const HistoryYear = () => {
    const [ yearShown, setYearShown ] = useState(new Date().getFullYear());
    const [ prevWeekCount, setPrevWeekCount ] = useState(1);
    const [usersYearSummaries, setUsersYearSummaries] = useState(null);
    console.log('userSummaries', (usersYearSummaries));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const eventId = useSelector((state: RootState) => state.user.currentUser?.currentEventId) || '';
    // const yearSummaries = useSelector((state: RootState) => state.user.currentUser.)
    console.log(eventId);

    const handleWeekChange = (prev: boolean) => {
        if (prev) {
            setYearShown(yearShown - 1);
        } else if (!prev) {
            setYearShown(yearShown + 1);
        }
    }

      useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await userActions.fetchUsersYearSummaries(eventId);
                console.log('year', data);
                setUsersYearSummaries(transformYearSummaries(data, `${yearShown}`));
            } catch (error) {
                console.error('Error fetching user year summaries:', error);
            }
        };

        fetchData();
      }, [yearShown, eventId])

  return (
    <TwoColumnGrid showSecondColumnInMobile={true}>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center', borderBottom: '1px solid #1E293B', paddingBottom: '8px'}}>
            <button className='date-btn' onClick={() => navigate('/history')}>
                <DynamicIcon icon={GoArrowLeft} width='40px' height='40px' color='white' />
            </button>
            <h4 style={{ margin: '0', fontWeight: '700', letterSpacing: '.85px' }}>History By Year</h4>
        </div>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', margin: '32px 0' }}>
            <button onClick={() => handleWeekChange(true)} className='date-btn'>
                <DynamicIcon icon={GoChevronLeft} width='40px' height='40px' />
            </button>
            
            <div style={{ minWidth: '300px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <span style={{ fontWeight: '700', fontSize: '18px' }}>{yearShown}</span>
            </div>

            <button disabled={yearShown === new Date().getFullYear() ? true : false} onClick={() => handleWeekChange(false)} className='date-btn'>
                <DynamicIcon icon={GoChevronRight} width='40px' height='40px' />
            </button>
        </div>
        <div className='container' style={{ height: '40vh'}}>
            <BarChart title={''} length={monthsOfYear} datasets={usersYearSummaries || []} eventType={''}
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

export default HistoryYear