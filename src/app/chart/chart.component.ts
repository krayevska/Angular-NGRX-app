import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as Chart from 'chart.js';
import { Report } from '../interfaces';
import { AppState } from '../state/app.state';
import { assessmentReportSelector } from '../state/selectors';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  private myChart: Chart;
  private report: Report;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.pipe(select(assessmentReportSelector)).subscribe((report) => {
      if (report) {
        this.report = report;
        this.getChart();
      }
    });
  }

  getChart(): void {
    let canvas = document.getElementById('myChart') as HTMLCanvasElement;
    let ctx = canvas.getContext('2d');
    this.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Agreeableness', 'Drive', 'Luck', 'Openess'],
        datasets: [
          {
            label: 'Your graph',
            data: [
              this.report.data.Agreeableness,
              this.report.data.Drive,
              this.report.data.Luck,
              this.report.data.Openess,
            ],
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
    });
  }
}
