import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MockStructuresProvider } from '../../providers/mock-structures/mock-structures';

/**
 * Generated class for the ReservationDetailsActivePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reservation-details-active',
  templateUrl: 'reservation-details-active.html',
})
export class ReservationDetailsActivePage {

  pageTitle = "Reservation Details";
  public request : any = {};
  public item: any;
  public rateType: any;
	
  public selectDateStartDate: any;
  public selectDateStartTime: any;
  public selectDateEndDate: any;
  public selectDateEndTime: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public mockStructuresProvider: MockStructuresProvider,) {
    this.request = mockStructuresProvider.getMockItemRequest();
    this.request['strict'] = true;
    this.request['additionalInfoReq'] = false;
    this.item = this.request.item;
    this.rateType = this.request.rateType;
    this.selectDateStartDate = this.request.selectDateStartDate;
    this.selectDateStartTime = this.request.selectDateStartTime;
    this.selectDateEndDate = this.request.selectDateEndDate;
    this.selectDateEndTime = this.request.selectDateEndDateTime;
    console.log(this.request);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationDetailsPage');
  }

  cancelRentalRequest(){
    
  }

}