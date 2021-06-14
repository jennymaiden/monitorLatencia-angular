import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MonitoreoProgramadoService } from '../../services/monitoreo-programado.service';

@Component({
  selector: 'app-parametrizacion',
  templateUrl: './parametrizacion.component.html',
  styleUrls: ['./parametrizacion.component.css']
})
export class ParametrizacionComponent implements OnInit {

  private MonitoreoProgramadoService: any;
  constructor( private router: Router, private monitoreoProgramadoservice: MonitoreoProgramadoService ) { }

  ngOnInit(): void {
  }

  irMonitoreoTiempoReal(): void {

    // Validación de los campos para el monitoreo
    // Consumir el servicio que va a empezar con el monitoreo
    this.MonitoreoProgramadoService.enviarMonitoreoProgramado().subscribe((data: any) => {
      console.log(data);
    });
    // Ir a la grafica a ver que hace
    this.router.navigate(['/grafica']);
  }
}
