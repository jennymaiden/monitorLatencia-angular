import {Component, OnInit, ViewChild} from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
// import * as ChartAnnotation from "chartjs-plugin-annotation";
//TODO Pagina de charts https://valor-software.com/ng2-charts/#/GeneralInfo
@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit{

  public lineChartData: ChartDataSets[] = [
    { data: [43.522, 58.719, 51.236, 42.888, 45.579, 36.607, 50.643, 36.190, 31.884, 43.016, 63.076, 41.759, 31.884, 43.016, 63.076], label: 'Usuario 1' },
    { data: [63.522, 48.719, 41.236, 52.888, 65.579, 56.607, 40.643, 36.190, 41.884, 33.016, 53.076, 31.759, 41.884, 53.016, 43.076], label: 'Usuario 2' },
    { data: [52.522, 35.719, 68.236, 46.888, 52.579, 36.607, 49.643, 56.190, 48.884, 52.016, 60.076, 47.759, 56.884, 69.016, 52.076], label: 'Usuario 3' }
  ];

  public lineChartLabels: Label[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(128,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // blue
      backgroundColor: 'rgba(155,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  public randomize(): void {
    // for (let i = 0; i < this.lineChartData.length; i++) {
    //
    //   for (let j = 0; j < this.lineChartData[i].data.length; j++) {
    //     this.lineChartData[i].data[j] = this.generateNumber(i);
    //   }
    // }
    // this.chart.update();
  }

  private generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    // const isHidden = this.chart.isDatasetHidden(1);
    // this.chart.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.lineChartData.forEach((x, i) => {
      const num = this.generateNumber(i);
      const data: number[] = x.data as number[];
      data.push(num);
    });
    this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  }

  public changeColor(): void {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel(): void {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
  }
}
