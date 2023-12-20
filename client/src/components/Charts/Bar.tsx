import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import React, { useState } from "react";
import { months } from "../../helpers/date";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

interface BarChartProps {
    title: String;
    datasets: any[];
    eventType: string
}

// function getRandomColor() {
//   const letters = '0123456789ABCDEF';
//   let color: string = '#';

//   // Generate a random six-character hex color code
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }

//   color += '90';

//   return color;
// }

// function getRandomColorsArray(size) {
//   const colorsArray: string[] = [];

//   for (let i = 0; i < size; i++) {
//     const color: string = getRandomColor();
//     colorsArray.push(color);
//   }

//   return colorsArray;
// }

export const BarChart = ({ title, datasets, eventType }: BarChartProps) => {
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';

    // Generate a random six-character hex color code
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    color += '90';

    return color;
  };

  const generateRandomColorsArray = (size) => {
    const colorsArray: string[] = [];

    for (let i = 0; i < size; i++) {
      const color: string = generateRandomColor();
      colorsArray.push(color);
    }

    return colorsArray;
  };

  const randomColors = generateRandomColorsArray(months.length);

  const newDatasets = datasets.map((dataset, index) => {
    const color = randomColors[index];
    const counts = months.map((month, monthIndex) => {
      const found = dataset.months.find(
        (m) => m.month === monthIndex + 1 && m.eventType === eventType
      );
      return found ? found.total : 0;
    });

    return {
      label: dataset.userName,
      data: counts,
      backgroundColor: color,
    };
  });

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
    datasets: newDatasets,
  };

  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
};
