import { Chart as ChartJS, Tooltip, Legend, Title, BarElement, LinearScale, CategoryScale } from "chart.js";
import React from "react";
import { Chart } from "react-chartjs-2";
import { useLoaderData } from "react-router";
import { formatDatasets } from "../../helpers/data";
import { months } from "../../helpers/date";

interface BarChartProps {
    title: String;
    datasets: any[]
}

export const BarChart = ({ title, datasets }: BarChartProps) => {
  const newDatasets: any[] = [];
  datasets.map((dataset) => {
    const counts = months.map((month, index) => {
      const found = dataset.monthlyCounts.find(obj => obj.month === index +1);
      if (found) {
        return found.count
      } else {
        return 0;
      }
    })
    newDatasets.push({
      label: dataset._id,
      data: counts,
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    })
  })

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
            text: `${title}`,
          },
        },
      };
      
      const labels = months;
      
      const data = {
        labels,
        datasets: newDatasets
        // datasets: [
        //   {
        //     label: 'Dataset 1',
        //     data: labels.map(() => Math.floor(Math.random() * 1000) + 1),
        //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
        //   },
        //   {
        //     label: 'Dataset 2',
        //     data: labels.map(() => Math.floor(Math.random() * 1000) + 1),
        //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
        //   },
        // ]
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