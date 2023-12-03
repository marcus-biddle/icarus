import React, { useEffect, useState } from 'react'
import CircularProgress, {
    CircularProgressProps,
  } from '@mui/material/CircularProgress';
  import Typography from '@mui/material/Typography';
  import Box from '@mui/material/Box';
import { getCurrentDate } from '../../helpers/date';
import './style.css'
import { Show } from '../../helpers/functional';
import { useLoaderData } from 'react-router';

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
  ) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex',  }}>
        <CircularProgress variant="determinate" {...props} size={'12rem'} color={props.value <= 25 ? 'error' : props.value <= 50 ? 'warning' : props.value <= 75 ? 'info' : props.value < 100 ? 'primary' : 'success'} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="white"
            fontSize={"26px"}
          >{props.value !== 100 ? `${Math.round(props.value)}% \nCompleted` : 'Good Job!'}</Typography>
        </Box>
      </Box>
    );
  }

const DailyTracker = () => {
    const [dailyTracker, setDailyTracker] = useState<{event: string, count: number} | null>(null);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [goalCount, setGoalCount] = useState(0);
    const data: any = useLoaderData();

    const handleTrack = () => {
      console.log('Selected Event:', selectedEvent);
      console.log('Goal Count:', goalCount);
      console.log({event: selectedEvent, count: goalCount})
      const eventData = {event: selectedEvent, count: goalCount}
      localStorage.setItem('trackedData', JSON.stringify(eventData));
      setDailyTracker(eventData);
    }

    console.log(dailyTracker?.count)
    useEffect(() => {
      // Check if 'trackedData' exists in localStorage
      const storedData = localStorage.getItem('trackedData');
  
      if (storedData) {
        // If it exists, parse the JSON string and set it in state
        setDailyTracker(JSON.parse(storedData));
      }
    }, []);

    const progress = dailyTracker && (data.pushups.totalPushupsToday / dailyTracker?.count)*100;
    console.log(progress)
  return (
    <div className='tracker-container'>
        <Show when={!!dailyTracker}>
          <section style={{ display: 'flex'}}>
              <CircularProgressWithLabel value={progress && progress <= 100 ? progress : 100} />
          </section>
          <section style={{ display: 'flex', flexDirection: 'column', gap: '32px'}}>
              <span>{getCurrentDate()}</span>
              <table className="mini-table">
                  <thead>
                      <tr>
                          <th>Event</th>
                          <th>Completed</th>
                          <th>Left</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td style={{ textTransform: 'capitalize'}}>{dailyTracker?.event}</td>
                          <td>{data.pushups.totalPushupsToday}</td>
                          <td>{dailyTracker && dailyTracker?.count - data.pushups.totalPushupsToday}</td>
                      </tr>
                      {/* <tr>
                      <td>Jane Smith</td>
                      <td>30</td>
                      <td>Los Angeles</td>
                      </tr> */}
                      {/* Add more rows as needed */}
                  </tbody>
              </table>
              {/* <ul style={{ textAlign: 'left'}}>
                  <li>10 pushups completed. Complete 90 more to reach your daily target goal.</li>
                  <li>0 pullups completed. Complete 90 more to reach your daily target goal.</li>
                  <li>0 miles completed. Complete 90 more to reach your daily target goal.</li>
              </ul> */}
              <p style={{ marginTop: '56px'}}>Reach your daily goal and earn {dailyTracker && dailyTracker?.count * 0.1} points.</p>
          </section>
        </Show>
        <Show when={!!dailyTracker === false}>
          <section style={{ width: '100%'}}>
            <h2>Want to set a daily goal for each exercise?</h2>
            <form className='tracker-form'>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: '370px'}}>
                <label htmlFor="event">Select the Event</label>
                <select
                  id="event"
                  name="event"
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  // onChange={(e) => setPushupCount(e.target.value)}
                  required
                >
                  <option value="" disabled>Select an event</option>
                  <option value="pushups">Pushups</option>
                  <option value="pullups">Pullups</option>
                  <option value="running">Running</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column'}}>
                <label htmlFor="goalCount">Target Goal</label>
                <input
                  type="number"
                  inputMode='numeric'
                  id="goalCount"
                  name="goalCount"
                  value={goalCount}
                  onChange={(e) => setGoalCount(parseInt(e.target.value, 10))}
                  required
                />
              </div>
            </form>
            <div style={{ maxHeight: '80px', display: 'flex', justifyContent: 'right', margin: '36px'}}>
                <button className='tracker-btn' id='track-btn' onClick={handleTrack}>Track</button>
                {/* <button className='tracker-btn' id='addEvent-btn'>Add Event</button> */}
            </div>
          </section>
        </Show>
    </div>
  )
}

export default DailyTracker