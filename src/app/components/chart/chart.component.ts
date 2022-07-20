import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';

import { Report } from '../../models/interfaces';
import { setChart } from '../../models/configFunctions';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  @Input() report: Report;

  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement>;

  constructor() {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const canvasRef = this.canvas.nativeElement.getContext('2d');
    this.getChart(canvasRef);
  }

  getChart(canvasRef: any): void {
    const chartData = setChart(this.report);
    //should I declare chart globally?
    const chart = new Chart(canvasRef, chartData);
  }
}
