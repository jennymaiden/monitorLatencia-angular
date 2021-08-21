          import { Injectable } from '@angular/core';
          import {HttpClient} from '@angular/common/http';
          import {Observable} from 'rxjs';
          import {environment} from '../../environments/environment';
          import {Grafica} from '../models/grafica';

@Injectable({
  providedIn: 'root'
})
export class MostrarGraficaService {

  urlGrafica = '/api/monitoreo/grafica';

  constructor(private http: HttpClient) { }

  getGrafica(idLatrencia: string): Observable<Grafica>{
      let parametroLatencia = '';
      // tslint:disable-next-line:triple-equals
      if (idLatrencia === 'undefined'){
          parametroLatencia = '/' + idLatrencia;
      }
      return this.http.get<Grafica>(environment.urlBackend + this.urlGrafica + parametroLatencia);
  }

}
