import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the RelaxedPolicyModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-relaxed-policy-modal',
  templateUrl: 'relaxed-policy-modal.html',
})
export class RelaxedPolicyModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RelaxedPolicyModalPage');
  }

  closeModal(): void {
    this.viewCtrl.dismiss();
  }
}
