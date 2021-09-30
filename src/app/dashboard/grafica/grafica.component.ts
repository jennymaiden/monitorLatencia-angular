import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType, NestedTickOptions} from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { MostrarGraficaService } from '../../services/mostrar-grafica.service';
import {Muestra} from '../../models/muestra';
import {Grafica} from '../../models/grafica';
import {Arreglo} from '../../models/arreglo';
import {ActivatedRoute, Router} from '@angular/router';
// import * as ChartAnnotation from "chartjs-plugin-annotation";
// TODO Pagina de charts https://valor-software.com/ng2-charts/#/GeneralInfo
@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit{

  public lineChartData: ChartDataSets[] = [{ data: [0], label: 'Base' }];

  public lineChartLabels: Label[] = [];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Numero de paquete'
        }
      }],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Tiempo en Milisegundos (ms)'
          },
          ticks: {
            minor: {
              min: 0,
              max: 150
            },
            major: {
              enabled: true
            }
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: '40',
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 4,
          label: {
            enabled: false,
            content: 'Optimo'
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
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
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

  public listCliente: any[];
  public idLatencia: any;

  constructor(private graficaService: MostrarGraficaService, private router: ActivatedRoute, private router2: Router) {
    this.listCliente = [];
  }

  ngOnInit(): void {
    this.getMostrarGrafica();
    this.idLatencia = this.router.snapshot.paramMap.get('idLatencia');
  }

  // public generateRandomColor(): string
  // {
  //   // tslint:disable-next-line:prefer-const
  //   let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  //   return randomColor;
  // }

  // Servicio para traer la informacion de la grafica
  public getMostrarGrafica(): void {

    this.graficaService.getGrafica(this.idLatencia).subscribe(data => {
      // data.getter('latencia');
      // console.log(`todo1 ${data}`);
      // console.log(`todo ${data.msg}`);
      // console.log(`latencia ${data.latencia[0]._id}`);
      // console.log(`arreglo ${data.arreglo}`);
      if (data.msg === 'OK'){
        console.log('RESPUESTA:' + data.arreglo);
        data.arreglo.forEach((currentValue, index) => {
          // @ts-ignore
          console.log('****RESPUESTA***:' + currentValue);
          this.listCliente.push(currentValue);
        });

        // tslint:disable-next-line:prefer-const
        let listData: number[]  = [];
        let labelData: string;
        this.listCliente.forEach((valor, index) => {
          listData = [];
          // console.log(`cliente label: Usuario ${currentValue.numCliente}`);
          labelData = `Usuario ${valor.numCliente}`;
          console.log('Usuario : ' + valor.numCliente);
          valor.muestra.forEach((muestraValue: any, index2: number) => {
            listData.push(muestraValue.tiempoRespuesta);
            // console.log(`tiempo de muesta: data ${muestraValue.tiempoRespuesta}`);
          });
          console.log('Tiempos : ' + listData);
          let chartData: ChartDataSets;
          chartData = {data: listData, label: labelData, borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16)};
          // console.log(`tamanio de muestra ${listData}`);
          this.lineChartData.push(chartData );
        });
        // console.log(`tamanio de listCliente ${this.listCliente[0].muestra.length}`);
        this.listCliente[0].muestra.forEach((m: Muestra, i: number) => {
          this.lineChartLabels.push(`${i}`);
        });
        // data.arreglo.forEach(dataCliente => {
        //   console.log(`dataKey ${dataCliente}`);
        // });
        // tslint:disable-next-line:forin
        // for (const dataKey in data.arreglo) {
        //   console.log(`dataKey ${dataKey}`);
        //   // @ts-ignore
        //   this.listCliente.push(dataKey);
        // }
      }
    });
  }
  irDiagnostico(): void {
    if (this.idLatencia !== void 0 && this.idLatencia !== null){
      this.router2.navigate(['/diagnostico/' + this.idLatencia]);
    }else{
      this.router2.navigate(['/diagnostico']);
    }

  }
}
