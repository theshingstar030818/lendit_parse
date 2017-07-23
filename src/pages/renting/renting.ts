import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RentingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-renting',
  templateUrl: 'renting.html',
})
export class RentingPage {
  private renter;
  
  constructor(public navCtrl: NavController,
  public navParams: NavParams) {
    this.renter = "requestedRentals";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentingPage');
  }
  goActiveRentals():void{
    this.navCtrl.push('RenterActivePage');
  }
  goConfirmedRentals():void{
    this.navCtrl.push('RenterConfirmedPage');
  }
  goPastRentals():void{
    this.navCtrl.push('RenterPastPage');
  }
}
