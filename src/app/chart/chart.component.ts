import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { Report } from '../interfaces';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  private myChart: Chart;
  @Input() report: Report;
  private canvasRef: any;
  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement>;

  constructor() {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.canvasRef = this.canvas.nativeElement.getContext('2d');
    this.getChart(this.canvasRef);
  }

  getChart(canvasRef: any): void {
    this.myChart = new Chart(canvasRef, {
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
