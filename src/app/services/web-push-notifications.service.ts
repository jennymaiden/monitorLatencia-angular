import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';

import { environment } from './../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebPushNotificationsService {

  private _swRegistration: any;
  private _isSubscribed: boolean = false;

  private applicationServerPublicKey: string;

  constructor(private httpClient: HttpClient, private swPush: SwPush) {
    this.applicationServerPublicKey = environment.publicKeyWeb;
  }

  /**
   * requestPermission
   *
   * Solicitar permiso para mostrar las notificaciones web.
   * @returns boolean
   */
  public requestPermission() {
    if ( this.checkServiceWorkerPushEnabled() ) {
      this.enableServiceWorker();
    } else {
      console.warn('Las notificaciones web no están soportadas por el navegador');
    }
  }

  /**
   * checkServiceWorkerPushEnabled
   *
   * Comprueba si el navagador soporta la funcionalidad de serviceWorkers y notificaciones web.
   * @returns boolean
   */
  private checkServiceWorkerPushEnabled(): boolean {
    return ('serviceWorker' in navigator && 'PushManager' in window);
  }

  /**
   * enableServiceWorker
   *
   * Habilita el service worker para recibir las notificaciones.
   */
  private enableServiceWorker(): void {
    navigator.serviceWorker.register('app/serviceWorker/sw.js', {scope: '/app/serviceWorker/'})
      .then( swReg => {
        console.log('Service Worker esta registrado', swReg);
        this._swRegistration = swReg;
        this.initialiseUI();
      })
      .catch((error => {
        console.error('Error Service Worker', error);
      }));
  }

  /**
   * initialiseUI
   *
   * Compruebe si el usuario permite las notificaciones web o le pide al usuario que lo permita
   * @returns void
   */
  public initialiseUI(): void {
    // Set the initial subscription value
    this.swPush.requestSubscription({
      serverPublicKey: this.applicationServerPublicKey
    })
        .then( (subscription: any) => {
          console.log('Usuario suscritó:initialiseUI: ', subscription);
          this.sendSubcriptionObject(subscription);
          this._isSubscribed = true;
        });
  }

  // private initialiseUI1(): void {
  //   // Set the initial subscription value
  //   this._swRegistration.pushManager.getSubscription()
  //       .then( (subscription: any) => {
  //         this._isSubscribed = !(subscription === null);
  //
  //         if (this._isSubscribed) {
  //           this.sendSubcriptionObject(subscription);
  //         } else {
  //           console.log('Usuario NO esta registrado');
  //           this.subscribeUser();
  //         }
  //       });
  // }

  /**
   * sendSubcriptionObject
   *
   * Send subscription object to backend to send notifications to customer
   * @param {} subscription
   * @returns void
   */
  public sendSubcriptionObject(subscription: any): void {
    const apiUrl = `${environment.urlBackend}/api/monitoreo/suscripcion`;
    console.log('url: ', apiUrl);
    this.httpClient.post(apiUrl, subscription).subscribe();
  }

  /**
   * subscribeUser
   *
   * Create subscription object
   * @returns void
   */
  private subscribeUser(): void {
    const applicationServerKey = this.urlB64ToUint8Array(this.applicationServerPublicKey);
    this.swPush.requestSubscription({
      serverPublicKey: this.applicationServerPublicKey
    })
      .then( (subscription: any) => {
        console.log('Usuario suscritó: subscribeUser:', subscription);
        this.sendSubcriptionObject(subscription);
        this._isSubscribed = true;
      })
        // tslint:disable-next-line:typedef
      .catch(((error: any) => {
        console.log('Fallo al realizar la subcripción: ', error);
      }));
  }

  /**
   * urlB64ToUint8Array
   *
   * Convierto la clave pública del servidor a un UintArray
   * @param {} base64String
   * @returns Uint8Array
   */
  private urlB64ToUint8Array(base64String: string | any[]): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
