import * as Chart from 'chart.js';
import { Report } from './interfaces';

export function setChart(report: Report): any {
  const chartData = {
    type: 'bar',
    data: {
      labels: Object.keys(report.data),
      datasets: [
        {
          label: 'Your graph',
          data: Object.values(report.data),
          backgroundColor: ['red', 'blue', 'orange', 'green'],
          borderColor: ['red', 'blue', 'orange', 'green'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
    },
  };

  return chartData;
}
