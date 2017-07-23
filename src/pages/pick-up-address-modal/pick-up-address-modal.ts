import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pick-up-address-modal',
  templateUrl: 'pick-up-address-modal.html',
})
export class PickUpAddressModalPage {
  @Input() data: any;
  @Input() events: any;
  public defaultAddress;
  public address;
  public city;
  public state;
  public zip;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    var dataFromPage = navParams.get('data');
    this.defaultAddress = "";
    this.address = "";
    this.city = "";
    this.state = "";
    this.zip = "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DateAvailabilityModalPage');
  }

  closeModal(): void {
    let dateData: any = {
      defaultAddress: this.defaultAddress,
      address: this.address,
      city: this.city,
      state: this.state,
      zip: this.zip
    };
    this.viewCtrl.dismiss(dateData);
  }



}
