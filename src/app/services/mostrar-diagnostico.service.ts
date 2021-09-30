import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseDiagnostico} from '../models/responseDiagnostico';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MostrarDiagnosticoService {
  urlDiagnostico = '/api/monitoreo/diagnostico';
  // idLatencia = '608f67db6ba6ad34e828a4d8';
  constructor(private http: HttpClient) { }

  getDiagnosticoById(idLatencia: string): Observable<ResponseDiagnostico>{
    let parametroLatencia = '';
    console.log('parametro: ' + idLatencia);
    // tslint:disable-next-line:triple-equals
    if (idLatencia != 'undefined' && idLatencia != null){
      parametroLatencia = '/' + idLatencia;
    }
    console.log('parametroLatencia: ' + parametroLatencia);
    return this.http.get<ResponseDiagnostico>(environment.urlBackend + this.urlDiagnostico + parametroLatencia);
  }
}
