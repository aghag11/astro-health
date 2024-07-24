import React from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HealthChart = ({ data }) => {
    const chartData = {
        labels: data.map(entry => new Date(entry.timestamp).toLocaleDateString()),
        datasets: [
            {
                label: 'Heart Rate',
                data: data.map(entry => entry.heartRate),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: false,
            },
            {
                label: 'Steps',
                data: data.map(entry => entry.steps),
                borderColor: 'rgba(153,102,255,1)',
                backgroundColor: 'rgba(153,102,255,0.2)',
                fill: false,
            },
            {
                label: 'Calories Burned',
                data: data.map(entry => entry.caloriesBurned),
                borderColor: 'rgba(255,159,64,1)',
                backgroundColor: 'rgba(255,159,64,0.2)',
                fill: false,
            }
        ]
    };

    return <Line data={chartData} />;
};

export default HealthChart;