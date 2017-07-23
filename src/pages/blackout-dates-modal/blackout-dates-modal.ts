import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CustomCalendarComponent } from '../../components/custom-calendar/custom-calendar';

@IonicPage()
@Component({
  selector: 'page-blackout-dates-modal',
  templateUrl: 'blackout-dates-modal.html',
})
export class BlackoutDatesModalPage {
  @Input() data: any;
  @Input() events: any;
  public blackoutDateFrom1;
  public blackoutDateTo1;
  public blackoutDateFrom2;
  public blackoutDateTo2;
  public blackoutDateFrom3;
  public blackoutDateTo3;

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public viewCtrl: ViewController,
  private myCalendar: CustomCalendarComponent,
  public ref: ChangeDetectorRef) {
    this.blackoutDateFrom1 = navParams.get('blackoutDateFrom1');
    this.blackoutDateTo1 = navParams.get('data');
    this.blackoutDateFrom2 = navParams.get('blackoutDateFrom2');
    this.blackoutDateTo2 = navParams.get('data');
    this.blackoutDateFrom3 = navParams.get('blackoutDateFrom3');
    this.blackoutDateTo3 = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlackoutDatesModalPage');
  }
  openCalendarFrom1(isRadio){
    let me = this;
    let calendarOptions = {
      isRadio: isRadio,
      // canBackwardsSelected:false,
    }
    this.myCalendar.openCalendar(calendarOptions).then((datesSelected)=>{
      me.blackoutDateFrom1 = datesSelected["date"]["time"];
      me.ref.detectChanges();
      console.log(datesSelected);
    }).catch((error)=>{
      console.error(error);
    });
  }

  openCalendarTo1(isRadio){
    let me = this;
    let calendarOptions = {
      isRadio: isRadio,
      // canBackwardsSelected:false,
    }
    this.myCalendar.openCalendar(calendarOptions).then((datesSelected)=>{
      me.blackoutDateTo1 = datesSelected["date"]["time"];
      me.ref.detectChanges();
      console.log(datesSelected);
    }).catch((error)=>{
      console.error(error);
    });
  }

  openCalendarFrom2(isRadio){
    let me = this;
    let calendarOptions = {
      isRadio: isRadio,
      // canBackwardsSelected:false,
    }
    this.myCalendar.openCalendar(calendarOptions).then((datesSelected)=>{
      me.blackoutDateFrom2 = datesSelected["date"]["time"];
      me.ref.detectChanges();
      console.log(datesSelected);
    }).catch((error)=>{
      console.error(error);
    });
  }

  openCalendarTo2(isRadio){
    let me = this;
    let calendarOptions = {
      isRadio: isRadio,
      // canBackwardsSelected:false,
    }
    this.myCalendar.openCalendar(calendarOptions).then((datesSelected)=>{
      me.blackoutDateTo2 = datesSelected["date"]["time"];
      me.ref.detectChanges();
      console.log(datesSelected);
    }).catch((error)=>{
      console.error(error);
    });
  }
  
  openCalendarFrom3(isRadio){
    let me = this;
    let calendarOptions = {
      isRadio: isRadio,
      // canBackwardsSelected:false,
    }
    this.myCalendar.openCalendar(calendarOptions).then((datesSelected)=>{
      me.blackoutDateFrom3 = datesSelected["date"]["time"];
      me.ref.detectChanges();
      console.log(datesSelected);
    }).catch((error)=>{
      console.error(error);
    });
  }

  openCalendarTo3(isRadio){
    let me = this;
    let calendarOptions = {
      isRadio: isRadio,
      // canBackwardsSelected:false,
    }
    this.myCalendar.openCalendar(calendarOptions).then((datesSelected)=>{
      me.blackoutDateTo3 = datesSelected["date"]["time"];
      me.ref.detectChanges();
      console.log(datesSelected);
    }).catch((error)=>{
      console.error(error);
    });
  }

  closeModal(): void {
    let dateData: any = {
      blackoutDateFrom1: this.blackoutDateFrom1,
      blackoutDateTo1: this.blackoutDateTo1,
      blackoutDateFrom2: this.blackoutDateFrom2,
      blackoutDateTo2: this.blackoutDateTo2,
      blackoutDateFrom3: this.blackoutDateFrom3,
      blackoutDateTo3: this.blackoutDateTo3
    };
    this.viewCtrl.dismiss(dateData);
  }
}
