import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import {environment} from '../../environments/environment';
import {WebPushNotificationsService} from '../services/web-push-notifications.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

  readonly PUBLIC_VAPID_KEY = environment.publicKeyWeb;
  public respuesta: any;
  constructor(private suscripcionWeb: WebPushNotificationsService, private swPush: SwPush) {
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

}
