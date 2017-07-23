import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-moderate-policy-modal',
  templateUrl: 'moderate-policy-modal.html',
})
export class ModeratePolicyModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModeratePolicyModalPage');
  }

  closeModal(): void {
    this.viewCtrl.dismiss();
  }

}
