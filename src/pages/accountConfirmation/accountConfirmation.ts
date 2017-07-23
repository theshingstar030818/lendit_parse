import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-account-confirmation',
  templateUrl: 'accountConfirmation.html',
})
export class AccountConfirmationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public nativeStorage: NativeStorage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountConfirmationPage');
  }

  goLogin():void{
    this.nativeStorage.remove('user');
    this.nativeStorage.remove('number');
    this.navCtrl.push('LoginPage');
  }

}
