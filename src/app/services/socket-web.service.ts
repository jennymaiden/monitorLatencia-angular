import {EventEmitter, Injectable, Output} from '@angular/core';
// import {Socket} from 'ngx-socket-io';
import { io } from 'socket.io-client';
import {environment} from '../../environments/environment';
import {ParametroTiempoReal} from '../models/parametroTiempoReal';
import {Parametro} from '../models/parametro';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DefaultEventsMap} from 'socket.io-client/build/typed-events';


@Injectable({
  providedIn: 'root'
})
export class SocketWebService {

  // private socket: any;
  // @Output() outEven: EventEmitter<any> = new EventEmitter();
  // constructor() {
  //   super({
  //     url: 'http://localhost:5000'
  //   });
  //   this.listen();
  // }
  // listen = () => {
  //   this.ioSocket.on('evento', (res: any) => this.outEven.emit(res));
  // }
  // emitEvent = (payload = {}) => {
  //   this.ioSocket.emit('evento', payload);
  //
  // }
}
// export class SocketWebService {
//
//   private socket: any;
//
//   constructor() {
//     this.socket = io(environment.serverSocket, {
//       transports: ['websocket'],
//       upgrade: false,
//       forceNew: true
//     });
//   }
//
//   // emitEvent = (event = 'evento', payload = {}) => {
//   //   console.log('enviar parametros ' + payload);
//   //   this.socket.emit('evento', {payload});
//   // }
//   // tslint:disable-next-line:typedef
//   setupSocketConnection() {
//
//     // this.socket = io(environment.serverSocket, {
//     //   transports: ['websocket'],
//     //   upgrade: false,
//     //   forceNew: true
//     // });
//     // this.socket = io(environment.serverSocket, { forceNew: true });
//     // this.socket.removeAllListeners();
//     console.log('se conecto');
//
//     // tslint:disable-next-line:only-arrow-functions typedef
//     // this.socket.on('evento', function(data: any) {
//     //   console.log(data);
//     // });
//     //
//     // this.socket.on('evento', (data: string) => {
//     //   console.log(data);
//     // });
//   }
//   // tslint:disable-next-line:typedef
//   listener() {
//     console.log('entro aqui');
//     return new Observable((observer) => {
//       this.socket.on('enviar', (message: any) => {
//         console.log('message :::' + message);
//         observer.next(message);
//       });
//     });
//   }
//   // tslint:disable-next-line:typedef
//   emitEvent( data = {}){
//     console.log('hola');
//     this.socket.connect ? console.log('conectado') : console.log('sin conectar');
//     this.socket.emit('enviar', data);
//   }
//
// }
