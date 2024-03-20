import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

import { useIsMobile } from '../../hooks/useIsMobile';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color: string = '#';
  
    // Generate a random six-character hex color code
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  
    color += '90'
  
    return color;
  }

export function formatDateFromTimestamp(timestamp) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(timestamp);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

export const GroupUserTotal = ({ date, data, labels }) => {
    const isMobile = useIsMobile({});
    const currentEventId = useSelector((state: RootState) => state.user.currentUser?.currentEventId) || '';

    const options = {
        responsive: true,
        maintainAspectRatio: isMobile ? false : true,
        plugins: {
          legend: {
            position: 'top' as const,
            
          },
          title: {
            display: true,
            text: 'Rep Count Totals',
            color: 'white',
            font: {
              size: 16,
            },
          },
        },
      };

    
    // console.log(labels)
    const graphData: any[] = [];

    console.log('graph',data)
    data.map((user: any) => {
        if (user.eventEntries.length > 0 && user.eventEntries.findIndex(entry => entry.event === currentEventId) !== -1) {
            graphData.push({
                label: user.username,
                data: labels.map((label, index) => {
                  const timeIndex = user.eventEntries.findIndex(entry => label === formatDateFromTimestamp(entry.time) && entry.event === currentEventId)
                  if (timeIndex !== -1) {
                    return user.eventEntries[timeIndex].totalReps;
                  } else {
                    return 0;
                  }
                }),
                backgroundColor: getRandomColor()
            })
        }
    })

    console.log('eventEntries', graphData);
    const chartData = {
        labels,
        datasets: graphData
      };

  return (
    <div className=' h-[70vh]'>
        <Bar options={options} data={chartData} className="h-[100%] w-full mb-20 pt-8" />
    </div>
  
  )

}
