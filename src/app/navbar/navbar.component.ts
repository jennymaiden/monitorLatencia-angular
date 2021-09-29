import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import {environment} from '../../environments/environment';
import {WebPushNotificationsService} from '../services/web-push-notifications.service';
import {ListarAlertaService} from '../services/listar-alerta.service';
import {Alerta} from '../models/alerta';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

  readonly PUBLIC_VAPID_KEY = environment.publicKeyWeb;
  public respuesta: any;
  public listAlerta: Alerta[] | any;

  constructor(private suscripcionWeb: WebPushNotificationsService, private swPush: SwPush, private alertaService: ListarAlertaService) {
    this.swPush.notificationClicks.subscribe((result) => {
      console.log('clicked', result.action);
    });
    this.swPush.notificationClicks.subscribe(
        ({action, notification}) => {
          // TODO: Do something in response to notification click.
        });
  }
  // tslint:disable-next-line:typedef
  suscribirNotificaciones() {
    // this.suscripcionWeb.initialiseUI();
    this.swPush.requestSubscription({
      serverPublicKey: this.PUBLIC_VAPID_KEY
    }).then((respects: any) => {
      this.respuesta = respects;
      console.log(`suscripcion`, respects);
      this.suscripcionWeb.sendSubcriptionObject(respects);

    }).catch((err: any) => {
      this.respuesta = err;
      console.log('Suscripción: ' + this.respuesta);
    });
  }

  verAlertas(): void{
    this.alertaService.getAlerta().subscribe(data => {
      if (data.msg === 'OK'){
        data.listAlerta.forEach((objAlerta, index ) => {
          this.listAlerta.push(objAlerta);
        });
      }
    });
  }

}
