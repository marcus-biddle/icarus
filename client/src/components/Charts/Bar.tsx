import { Chart as ChartJS, Tooltip, Legend, Title, BarElement, LinearScale, CategoryScale } from "chart.js";
import React, { useState } from "react";
import { Chart, Line } from "react-chartjs-2";
import { useLoaderData } from "react-router";
import { formatDatasets } from "../../helpers/data";
import { months } from "../../helpers/date";

interface BarChartProps {
    title: String;
    datasets: any[];
    eventType: string
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color: string = '#';

  // Generate a random six-character hex color code
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  color += '90';

  return color;
}

function getRandomColorsArray(size) {
  const colorsArray: string[] = [];

  for (let i = 0; i < size; i++) {
    const color: string = getRandomColor();
    colorsArray.push(color);
  }

  return colorsArray;
}

export const BarChart = ({ title, datasets, eventType }: BarChartProps) => {
  const [randomColors, setRandomColors] = useState(getRandomColorsArray(datasets.length))
  const newDatasets: any[] = [];
  datasets.map((dataset) => {
    const counts = months.map((month, index) => {
      const found = dataset.months.find(m => m.month === index +1 && m.eventType === eventType);
      if (found) {
        return found.total
      } else {
        return 0;
      }
    })
    newDatasets.push({
      label: dataset.userName,
      data: counts,
      backgroundColor: randomColors
    })
  })

  console.log('chart',newDatasets);

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