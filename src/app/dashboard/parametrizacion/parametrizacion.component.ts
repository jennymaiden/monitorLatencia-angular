import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { MonitoreoProgramadoService } from '../../services/monitoreo-programado.service';
import {Parametro} from '../../models/parametro';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ModalComponent} from '../../modal/modal.component';
import {SocketWebService} from '../../services/socket-web.service';

@Component({
  selector: 'app-parametrizacion',
  templateUrl: './parametrizacion.component.html',
  styleUrls: ['./parametrizacion.component.css']
})
export class ParametrizacionComponent implements OnInit {

  myFormulario: FormGroup;
  // requeridos = new FormControl('', [Validators.required],);

  constructor( private router: Router, private monitoreoProgramadoService: MonitoreoProgramadoService,
               private fb: FormBuilder, public dialog: MatDialog, private socketService: SocketWebService) {
    this.myFormulario = this.fb.group({
      url: ['', Validators.required],
      numUsuarios: ['', Validators.required],
      tamanio: ['', Validators.required],
      tiempo: ['', Validators.required],
      horaInicio: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      horaFin: ['', Validators.required]
    });
  }
  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  getErrorMessage() {
    if (this.myFormulario.valid) {
      return 'Debe ingresar un valor';
    }else {
      return '';
    }
  }

  crearMonitoreoProgramado(): void {
    const parametros: Parametro = {
      numClientes: this.myFormulario.get('numUsuarios')?.value,
      tamanioPaquete: this.myFormulario.get('tamanio')?.value,
      tiempoSeg: this.myFormulario.get('tiempo')?.value,
      URL: this.myFormulario.get('url')?.value,
      fechaInicio: this.myFormulario.get('fechaInicio')?.value,
      horaInicio: this.myFormulario.get('horaInicio')?.value,
      fechaFin: this.myFormulario.get('fechaFin')?.value,
      horaFin: this.myFormulario.get('horaFin')?.value,
    };
    console.log('parametros: ' + parametros);
    const jsonParametros = JSON.stringify(parametros);
    console.log('parametrosjson : ' + jsonParametros);
    if (this.myFormulario.valid){
      this.monitoreoProgramadoService.enviarMonitoreo(parametros).subscribe(data => {
        if (data.msg === 'OK'){
          console.log('el id de la idLatencia creada fue : ' + data.idLatencia);
          console.log('el id de parametros creada fue : ' + data.idParametros);
          this.openDialog();
        }
      });
    }
  }

  crearMonitoreoTiempoReal(): void{
    console.log('monitoreo tiempo real');
    const parametros: Parametro = {
      numClientes: this.myFormulario.get('numUsuarios')?.value,
      tamanioPaquete: this.myFormulario.get('tamanio')?.value,
      tiempoSeg: this.myFormulario.get('tiempo')?.value,
      URL: this.myFormulario.get('url')?.value,
      fechaInicio: this.myFormulario.get('fechaInicio')?.value,
      horaInicio: this.myFormulario.get('horaInicio')?.value,
      fechaFin: this.myFormulario.get('fechaFin')?.value,
      horaFin: this.myFormulario.get('horaFin')?.value,
    };
    console.log('parametros: ' + parametros);
    const jsonParametros = JSON.stringify(parametros);
    console.log('parametrosjson : ' + jsonParametros);
    if (this.myFormulario.valid){
      // this.socketService.outEven.subscribe(res => {
      //   this.messages.push(res.msg)
      // })
    }
  }
  // irMonitoreoTiempoReal(): void {
  //
  //   // Validación de los campos para el monitoreo
  //   // Consumir el servicio que va a empezar con el monitoreo
  //   this.monitoreoProgramadoService.enviarMonitoreo().subscribe((data: any) => {
  //     console.log(data);
  //   });
  //   // Ir a la grafica a ver que hace
  //   this.router.navigate(['/grafica']);
  // }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = 'Se ha programado la toma de muestras para el dia ' + new Date (this.myFormulario.get('fechaInicio')?.value) + 'a las ' + this.myFormulario.get('horaInicio')?.value;

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
