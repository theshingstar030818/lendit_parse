import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RentalRequestSummaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-rental-request-summary',
  templateUrl: 'rental-request-summary.html',
})
export class RentalRequestSummaryPage {

  public pageTitle : String = "Rental Request Summary";
  public request : any = {};
  public item: any;
  public rateType: any;
  public selectDateStartDate: any;
  public selectDateStartTime: any;
  public selectDateEndDate: any;
  public selectDateEndTime: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let data = navParams.data;
    this.request = navParams.data;
    this.request['strict'] = true;
    this.request['additionalInfoReq'] = false;
    this.item = data.item;
    this.rateType = data.rateType;
    this.selectDateStartDate = data.selectDateStartDate;
    this.selectDateStartTime = data.selectDateStartTime;
    this.selectDateEndDate = data.selectDateEndDate;
    this.selectDateEndTime = data.selectDateEndDateTime;
    console.log(this);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentalRequestSummaryPage');
  }

  rentalRequestSummaryNext(){
    console.log("rentalRequestSummaryNext ");
    this.navCtrl.push("RentalRequestConfirmationPage",{});
  }
}
