import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { CustomCalendarComponent } from '../../components/custom-calendar/custom-calendar';

import moment from "moment";

/**
 * Generated class for the ItemDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {

  @ViewChild(Slides) slides: Slides;

  public pageTitle : String = "Item Details";
  public itemRequest : any;
  public sliderOptions = {
    backButtonDisabled : false,
    nextButtonDisabled : false
  }

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private myCalendar: CustomCalendarComponent,
      public ref: ChangeDetectorRef,
    ) {}

  getMockItemRequest(){
    let requestItem = {
      itemRentByRadioSelection: "Hourly",
      item : {
        name: "2015 Ski Boat",
        rating: 3,
        rate: {
          Hourly: 2,
          Daily: 3,
          Weekly: 5
        },
        images: [
          "assets/img/stamp1.jpg",
          "assets/img/stamp2.jpg",
          "assets/img/stamp3.jpg",
          "assets/img/stamp4.jpg"
        ],
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        rentByRadioSelection:"Hourly",
        location: {
          stringValue :  "Rue Bedard"
        },
        lender:{
          name: "Mary Johnson",
          rating: 5
        },
        times: {
          blackDates: [
            (new Date(Date.parse("2017-08-01".replace('-','/')))).getTime(),
            (new Date(Date.parse("2017-08-02".replace('-','/')))).getTime(),
            (new Date(Date.parse("2017-08-03".replace('-','/')))).getTime(),
            (new Date(Date.parse("2017-08-12".replace('-','/')))).getTime(),
            (new Date(Date.parse("2017-08-14".replace('-','/')))).getTime(),
            (new Date(Date.parse("2017-08-22".replace('-','/')))).getTime(),
            (new Date(Date.parse("2017-08-29".replace('-','/')))).getTime()
          ]
        }
      },
      selectDateStartDate: new Date().toISOString(),
      selectDateStartTime:"", //from modal
      selectDateEndDate: new Date().toISOString(),  
      selectDateEndTime:"", // from modal
    }
    return requestItem;
  }

  ionViewWillEnter(){

  }

  ionViewWillLoad(){
    this.itemRequest = this.getMockItemRequest();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailsPage');
    console.log(this.itemRequest);
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter ItemDetailsPage');
    this.updateSlideButtons();
  }

  flagPost(){
    console.log("flagPost");
  }

  onRatingModelChange(event){
    console.log("onRatingModelChange");
    console.log(event);
  }

  viewImage(image){
    console.log("view image : " + image);
  }

  requestRent(){
    console.log("request rent");
    this.navCtrl.push("RentalRequestSummaryPage", this.itemRequest);
  }

  viewItemLocation(){
    console.log("view item location")
  }

  sliderImageButton(counter){
    console.log("button pressed : " + counter);
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
    this.updateSlideButtons();
  }

  updateSlideButtons(){
    this.sliderOptions.backButtonDisabled = this.slides.isBeginning();
    this.sliderOptions.nextButtonDisabled = this.slides.isEnd();
  }

  goToSlide(slideIndex) {
    this.slides.slideTo( (this.slides.getActiveIndex() + slideIndex) , 500);
  }

  requestHoursPopUp(){
    console.log("requestHoursPopUp");
    this.navCtrl.push("AvailableTimesPopUpModalPage", this.itemRequest);
  }

  openCalendar(isRadio){
    let me = this;
    let calendarOptions = {
      disableDays: this.itemRequest.item.times["blackDates"],
      isRadio: isRadio,
      canBackwardsSelected:false,
      defaultDate: this.itemRequest.selectDateStartDate,
      isSaveHistory:true,
    }
    this.myCalendar.openCalendar(calendarOptions).then((datesSelected)=>{
      if(isRadio){
        me.itemRequest.selectDateStartDate = datesSelected["date"]["time"];
        me.itemRequest.selectDateEndDate = datesSelected["date"]["time"];
      }else{
        me.itemRequest.selectDateStartDate = datesSelected["from"]["time"];
        me.itemRequest.selectDateEndDate = datesSelected["to"]["time"];
      }
      me.ref.detectChanges();
    }).catch((error)=>{
      console.error(error);
    });
  }

  getFormattedDate(time: number){
    let fd = new Date(time).toISOString();
    return fd;
  }
}
