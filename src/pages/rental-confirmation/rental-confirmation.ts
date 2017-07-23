import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RentalConfirmationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-rental-confirmation',
  templateUrl: 'rental-confirmation.html',
})
export class RentalConfirmationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentalRequestConfirmationPage');
  }

  onSlideChangeStart(event){
    console.log("onSlideChangeStart");
    this.navCtrl.setRoot("MainDashboardPage");
  }

}
