import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,ChartDataLabels
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" //as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart"
    }
  }
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [100,300,200,500,250,120,380],
      backgroundColor: "rgba(255, 99, 132, 0.5)",




      datalabels: {
        align: 'end',
        anchor: 'start'
      }
    }
  ]
};

export default function App() {
  return <Bar options={options} data={data} />;
}
