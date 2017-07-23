import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform, Events } from 'ionic-angular';
import { Network } from '@ionic-native/network';

/*
  Generated class for the ConnectivityProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ConnectivityProvider {

  connectSubscription: any;
  disconnectSubscription : any;
  onDevice: boolean;
  hasInternetAccess: boolean = true;

  constructor(
    public http: Http,
    private network: Network,
    public platform: Platform,
    public events: Events,
  ) {
    console.log('Hello ConnectivityProvider Provider');
    // watch network for a disconnect
    this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    });


    this.connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
       // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });
  }

  hasNetwork(){
    if(this.onDevice && this.network.type){
      return this.network.type !== "none";
    } else {
      return navigator.onLine; 
    }
  }

  hasInernet(){
    return this.hasInternetAccess;
  }

  networkDisconnected(){
    this.hasInternetAccess = false;
    this.events.publish('connectivity-service-event', "Network was disconnected");
  }

  stopNetworkDisconnectWatch(){
    // stop disconnect watch
    this.disconnectSubscription.unsubscribe();
  }

  stopNetworkConnectWatch(){
    // stop connect watch
    this.connectSubscription.unsubscribe();
  }
  
  networkConnected(){
    let me = this;
    console.log("ConnectivityService -> networkConnected()");
    setTimeout(() => {
      me.testInternetAccess();
    }, 3000);
  }

  testInternetAccess(){
    let me = this;
    let url = 'http://162.243.118.87:4041/blank.org/';
    let headers = new Headers();
    headers.append('Pragma','no-cache');
    headers.append('Cache-Control','no-cache');
    headers.append('Expires',"0");
    
    // this.http.get(url, {
    //     headers: headers
    //   })
    //   .timeout(2000, new Error('delay exceeded'))
    //   .map(res => res)
    //   .subscribe(data => {
    //     if(!me.hasInternetAccess){this.events.publish('connectivity-service-event:internet', true);}
    //     me.hasInternetAccess = true;          
    //   },
    //   err => {
    //     me.hasInternetAccess = false;
    //     this.events.publish('connectivity-service-event:internet', false);
    //   });
    
    me.hasInternetAccess = true;

  }
}
