import React from 'react'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Weekly Average vs. Daily Performance Chart',
    },
  },
  scales: {
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};



const AverageVsDaily = () => {
    const eventEntries = useSelector((state: RootState) => state.user.currentUser?.eventEntries) || [];
    const currentEventId = useSelector((state: RootState) => state.user.currentUser?.currentEventId);
    const statistics = useSelector((state: RootState) => state.user.currentUser?.statistics);
    const weeklyAverage = statistics?.find(stat => stat.eventId === currentEventId)?.weeklyAverage || 0;

    console.log(eventEntries)
    if (eventEntries.length === 0) return;
    // Convert timestamps to Date objects
const formattedData = eventEntries.slice(0,8).filter(entry => entry.event === currentEventId).map(entry => ({
    ...entry,
    time: new Date(entry.time),
  }));

  

  if (formattedData.length === 0) return;
  // Group entries by day
const groupedData = formattedData.reduce((acc, entry) => {
    const dayKey = entry.time.toDateString();
    if (!acc[dayKey]) {
      acc[dayKey] = [];
    }
    acc[dayKey].push(entry);
    return acc;
  }, {});

  
  // Calculate sum or average for each day
const result = Object.values(groupedData).map((entries: any) => {
    const sumReps = entries.reduce((sum, entry) => sum + entry.reps, 0);
    const sumXp = entries.reduce((sum, entry) => sum + entry.xp, 0);
  
    return {
      date: new Date(entries[0].time).toLocaleDateString(),
      sumReps,
    };
  });

  console.log(result)

  // Get averageRepsThisWeek
  // const currentDate = new Date();
  // const startOfWeek = new Date(currentDate);
  // startOfWeek.setDate(currentDate.getDate() - (currentDate.getDay() + 6) % 7); // Go back to the last Sunday
  // startOfWeek.setHours(0, 0, 0, 0);
  
  // const endOfWeek = new Date(currentDate);
  // endOfWeek.setDate(startOfWeek.getDate() + 6); // Add six days to get to this Saturday
  // endOfWeek.setHours(23, 59, 59, 999);

// console.log(startOfWeek, endOfWeek)
// const entriesThisWeek = result.filter(entry => {
//   const entryDate = new Date(entry.date);
//   return entryDate >= startOfWeek && entryDate <= endOfWeek;
// });

  const labels = result.map(entry => entry.date);

  const data = {
    labels,
    datasets: [
      {
        label: 'Your Moving Average',
        data: Array.from({ length: result.length }, () => weeklyAverage),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Your Daily Count',
        data: result.map(entry => entry.sumReps),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };

  return (
    <Line options={options} data={data} className=' w-full h-full' />
  )
}

export default AverageVsDaily