import { Chart as ChartJS, Tooltip, Legend, Title, BarElement, LinearScale, CategoryScale } from "chart.js";
import React from "react";
import { Chart } from "react-chartjs-2";

interface PushupTrackerProps {
    months: string[];
}

export const PushupTracker = ({ months }: PushupTrackerProps) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
    
      const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Total Pushups Chart',
          },
        },
      };
      
      const labels = months;
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: [100, 200, 50],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: [100, 200, 50],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
      
    
  return (
    <>
    <Chart 
    type={"bar"} 
    datasetIdKey="pushups" 
    options={options} data={data} />
    </>
    
  )
}