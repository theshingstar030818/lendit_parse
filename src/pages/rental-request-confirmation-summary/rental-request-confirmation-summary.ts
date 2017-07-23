import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MockStructuresProvider } from '../../providers/mock-structures/mock-structures';
import { SearchProvider } from '../../providers/search/search';

/**
 * Generated class for the RentalRequestConfirmationSummaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-rental-request-confirmation-summary',
  templateUrl: 'rental-request-confirmation-summary.html',
})
export class RentalRequestConfirmationSummaryPage {

  pageTitle = "Reservation Details";
  public request : any = {};
  public item: any;
  public rateType: any;
  public selectDateStartDate: any;
  public selectDateStartTime: any;
  public selectDateEndDate: any;
  public selectDateEndTime: any;

  individualProfile = {
    name: "",
    totalEarnings: "",
    location: "",
    rating: 0
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public mockStructuresProvider: MockStructuresProvider,
    public searchService: SearchProvider
  ) {
    this.request = mockStructuresProvider.getMockItemRequest();
    this.request['strict'] = true;
    this.request.policy = {
      id: 0,
      name: 'strict',
    }
    this.request['additionalInfoReq'] = false;
    this.item = this.request.item;
    this.rateType = this.request.rateType;
    this.selectDateStartDate = this.request.selectDateStartDate;
    this.selectDateStartTime = this.request.selectDateStartTime;
    this.selectDateEndDate = this.request.selectDateEndDate;
    this.selectDateEndTime = this.request.selectDateEndDateTime;
    console.log(this.request);
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad IndividualProfilePage');
    this.getIndividualProfileInfo();
  }

  getIndividualProfileInfo(){
    console.log("initList . . . ");
    let me = this;
    me.individualProfile = {
      name: "Sara Jones",
      totalEarnings: "$15.00",
      location: "Mission Beach",
      rating: 3.5
    }

    me.searchService.doSearch().then((items)=>{
      for(let i=0; i<(<any>items).length; i++){
        console.log(items[i]);
      }
    }).catch((error)=>{
      console.error(error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationDetailsPage');
  }

  cancelRentalRequest(){
    
  }

}
