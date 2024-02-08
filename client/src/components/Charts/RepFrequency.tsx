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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      
    },
    title: {
      display: true,
      text: 'Rep Range Histogram',
      color: 'white',
      font: {
        size: 16,
      },
    },
  },
};



// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'You',
//       data: labels.map(() => Math.random()),
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Avg Competitor',
//       data: labels.map(() => Math.random()),
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

export const RepFrequency = () => {
    const histogram = useSelector((state: RootState) => state.user.currentUser?.graphs?.find(graph => graph.graphType === 'histogram'));

    const labels = ['< 10', '10 - 24', '25 - 49', '50 - 74', '75+'];
    const data = {
        labels,
        datasets: [
          {
            label: 'You',
            data: histogram.graphData.userData,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Avg Competitor',
            data: histogram.graphData.binSizes.map((maxNum: number) => (Math.floor(Math.random() * (maxNum + 1)) / maxNum)),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

  return (
    <div className="rounded-lg border shadow-md">
        <Bar options={options} data={data} />
    </div>
  
  )
}