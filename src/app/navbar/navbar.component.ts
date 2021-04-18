import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

  readonly PUBLIC_VAPID_KEY = 'BIYRI4eM_bXt7yb5nzE6ndMyBSmnu0lWKl61Ctdhli12Pp0bpjVFA4po6KOtPIbrhwh8M49SBOc373Nvxs0Ch6o';
  public respuesta: any;
  constructor(private swPush: SwPush) {

  }
  // tslint:disable-next-line:typedef
  suscribirNotificaciones() {
    this.swPush.requestSubscription({
      serverPublicKey: this.PUBLIC_VAPID_KEY
    }).then((respects: any) => {
      this.respuesta = respects;
      alert(this.respuesta);

    }).catch((err: any) => {
      this.respuesta = err;
      console.log('Suscripción: ' + this.respuesta);
    });
  }
}
