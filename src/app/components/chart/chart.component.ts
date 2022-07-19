import {
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as Chart from 'chart.js';
import { Report } from '../../models/interfaces';
import { setChart } from '../../models/chatr';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  private setChart = setChart;
  // private chart: Chart;

  @Input() report: Report;

  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement>;

  constructor() {}
  ngOnInit(): void {}

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('CHANGES ', changes);
  // }

  ngAfterViewInit(): void {
    const canvasRef = this.canvas.nativeElement.getContext('2d');
    this.getChart(canvasRef);
  }

  getChart(canvasRef: any): void {
    const chartData = this.setChart(this.report);
    //should I declare chart globally?
    const chart = new Chart(canvasRef, chartData);
  }
}
