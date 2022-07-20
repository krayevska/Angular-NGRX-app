import { Report, User } from './interfaces';
import { CSV_HEADINGS, CHART_COLORS } from './constatns';

export function setChart(report: Report): any {
  const chartData = {
    type: 'bar',
    data: {
      labels: Object.keys(report.data),
      datasets: [
        {
          label: 'Your graph',
          data: Object.values(report.data),
          backgroundColor: CHART_COLORS,
          borderColor: CHART_COLORS,
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

export function convertToCsv(users: User[]): string {
  const csvString = [
    CSV_HEADINGS,
    ...users.map((item) => {
      let userData = [];
      CSV_HEADINGS.forEach((heading) => {
        userData.push(JSON.stringify(item[heading]));
      });
      return userData;
    }),
  ]
    .map((item) => item.join(','))
    .join('\n');

  return csvString;
}
