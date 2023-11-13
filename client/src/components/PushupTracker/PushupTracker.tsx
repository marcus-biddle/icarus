import { Chart as ChartJS, Tooltip, Legend, Title, BarElement, LinearScale, CategoryScale } from "chart.js";
import React from "react";
import { Chart } from "react-chartjs-2";
import { useLoaderData } from "react-router";
import { formatDatasets } from "../../helpers/data";

interface PushupTrackerProps {
    dates: string[];
}

export const PushupTracker = ({ dates }: PushupTrackerProps) => {
  const {users, pushups}: any = useLoaderData();
  const yearData = formatDatasets(users, 'year');
  const todaysData = formatDatasets(pushups, 'today');
  const chartData = dates.length === 1 ? todaysData : yearData;

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
            text: 'Pushups Chart',
          },
        },
      };
      
      const labels = dates;
      
      const data = {
        labels,
        datasets: chartData
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