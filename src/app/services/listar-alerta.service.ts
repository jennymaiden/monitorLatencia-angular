import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ListAlerta} from '../models/listAlerta';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListarAlertaService {

  urlAlerta = '/api/monitoreo/alertas';
  constructor(private http: HttpClient) { }
  getAlerta(): Observable<ListAlerta>{
    return this.http.get<ListAlerta>(environment.urlBackend + this.urlAlerta);
  }

  actualizarAlerta(idAlerta: string): Observable<any>{
    return this.http.get<any>(environment.urlBackend + this.urlAlerta + '/' + idAlerta);
  }
}
