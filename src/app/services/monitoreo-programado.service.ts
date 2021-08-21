import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {Parametro} from '../models/parametro';
import {Observable, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Grafica} from '../models/grafica';
import {Latencia} from '../models/latencia';

@Injectable({
  providedIn: 'root'
})
export class MonitoreoProgramadoService {

  private urlMonitoreo = '/api/monitoreo/programado';

  constructor(private http: HttpClient) { }

  enviarMonitoreo(parametros: Parametro): Observable<any>{
    console.log('la url es: ' + environment.urlBackend + this.urlMonitoreo);

    return this.http.post<any>(environment.urlBackend + this.urlMonitoreo, parametros);
  }
}
