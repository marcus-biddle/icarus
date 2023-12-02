import React, { useState } from 'react'
import CircularProgress, {
    CircularProgressProps,
  } from '@mui/material/CircularProgress';
  import Typography from '@mui/material/Typography';
  import Box from '@mui/material/Box';
import { getCurrentDate } from '../../helpers/date';
import './style.css'
import { Show } from '../../helpers/functional';

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
  ) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex',  }}>
        <CircularProgress variant="determinate" {...props} size={'12rem'} color={'primary'} />
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
          >{`${Math.round(props.value)}%`} <br /> completed</Typography>
        </Box>
      </Box>
    );
  }

const DailyTracker = () => {
    const storedValue = localStorage.getItem('dailyTracker');
    const initialDailyTracker = storedValue ? JSON.parse(storedValue) : null;
    const [dailyTracker, setDailyTracker] = useState<boolean | null>(initialDailyTracker);

  return (
    <div className='tracker-container'>
        <Show when={!!dailyTracker}>
        <section style={{ display: 'flex'}}>
            <CircularProgressWithLabel value={70} />
        </section>
        <section>
            {getCurrentDate()}
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
                        <td>Pushups</td>
                        <td>10</td>
                        <td>90</td>
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
            <div>Reach your daily goal and earn X points.</div>
        </section>
        </Show>
        
    </div>
  )
}

export default DailyTracker