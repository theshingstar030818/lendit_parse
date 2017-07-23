import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LendingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-lending',
  templateUrl: 'lending.html',
})
export class LendingPage {
  private lender;

  constructor(public navCtrl: NavController,
  public navParams: NavParams) {
    this.lender = "rentalItems";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LendingPage');
  }

  goActiveRentals():void{
    this.navCtrl.push('LenderActivePage');
  }
  goScheduledRentals():void{
    this.navCtrl.push('LenderConfirmedPage');
  }
  goPastRentals():void{
    this.navCtrl.push('LenderPastPage');
  }
  goToPostItem(){
    this.navCtrl.push('PostNewItemPage');
  }
}
