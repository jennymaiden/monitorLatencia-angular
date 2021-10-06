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

  getGrafica(idLatencia: string): Observable<Grafica>{
      let parametroLatencia = '';
      console.log(`la latencia es : ${idLatencia}`);
      // tslint:disable-next-line:triple-equals
      if (idLatencia != 'undefined' && idLatencia != null){
          parametroLatencia = '/' + idLatencia;
      }
      console.log(`lOA PARAMETROS SON : ${parametroLatencia}`);
      return this.http.get<Grafica>(environment.urlBackend + this.urlGrafica + parametroLatencia);
  }

}
