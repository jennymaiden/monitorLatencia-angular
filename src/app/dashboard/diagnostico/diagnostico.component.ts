import { Component, OnInit } from '@angular/core';
import {MostrarDiagnosticoService} from '../../services/mostrar-diagnostico.service';
import {Parametro} from '../../models/parametro';
import { ActivatedRoute, Params } from '@angular/router';
import {Diagnostico} from '../../models/diagnostico';
import {ResponseDiagnostico} from '../../models/responseDiagnostico';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent implements OnInit {

  public idLatencia: any;
  response: ResponseDiagnostico | undefined;
  jsonQoE: any;

  constructor(private diagnosticoServer: MostrarDiagnosticoService, private rutaActiva: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.idLatencia = this.rutaActiva.snapshot.paramMap.get('idLatencia');
    this.getDiagnosticoById(this.idLatencia);
  }

  public getDiagnosticoById(latencia: string): void {
    this.diagnosticoServer.getDiagnosticoById(latencia).subscribe(data => {
      if (data.msg === 'OK') {
        // console.log('data: ' + data.parametro);
        // this.objParametro = data.parametro;
        // // console.log('parameters: ' + this.objParametro.fechaFin);
        // this.objDiagnostico = data.diagnostico;
        // console.log('diagnostico: ' + this.objDiagnostico.estadistica);
        this.response = data;
        this.jsonQoE = JSON.parse(this.response?.diagnostico?.QoE || '');
      }
    });
  }

  permiteJuegos(): boolean {
    if (this.response?.diagnostico  !== void 0){
      if ( this.jsonQoE.JUEGOS){
        return true;
      }else {
        return false;
      }
    }else{
      return false;
    }
  }

  permiteRTSP(): boolean {
    if (this.response?.diagnostico  !== void 0){
      if (this.jsonQoE.RTSP){
        return true;
      }else {
        return false;
      }
    }else{
      return false;
    }
  }

  permitePeliculas(): boolean {
    if (this.response?.diagnostico  !== void 0){
      if (this.jsonQoE.PELICULAS){
        return true;
      }else {
        return false;
      }
    }else{
      return false;
    }
  }

  permiteRedesSociales(): boolean {
    if (this.response?.diagnostico  !== void 0){
      if (this.jsonQoE.REDSOCIAL){
        return true;
      }else {
        return false;
      }
    }else{
      return false;
    }
  }

  permiteSmtp(): boolean {
    if (this.response?.diagnostico  !== void 0){
      if (this.jsonQoE.SMTP){
        return true;
      }else {
        return false;
      }
    }else{
      return false;
    }
  }

  permiteHttp(): boolean {
    if (this.response?.diagnostico  !== void 0){
      if (this.jsonQoE.HTTP){
        return true;
      }else {
        return false;
      }
    }else{
      return false;
    }
  }

}
