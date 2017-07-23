import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the StrictPolicyModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-strict-policy-modal',
  templateUrl: 'strict-policy-modal.html',
})
export class StrictPolicyModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StrictPolicyModalPage');
  }

  closeModal(): void {
    this.viewCtrl.dismiss();
  }
}
