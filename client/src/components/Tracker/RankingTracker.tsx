import React from 'react'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useLoaderData } from 'react-router';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} color='primary' />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="white" fontSize={11}>{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

const RankingTracker = () => {
    const data: any = useLoaderData();
    const progress = (Math.round(data.expPoints.total) / 500)*100;
    console.log(progress)
  return (
    <div>
        <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={progress} />
        </Box>
    </div>
  )
}

export default RankingTracker