import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CustomCalendarComponent } from '../../components/custom-calendar/custom-calendar';

@IonicPage()
@Component({
  selector: 'page-date-availability-modal',
  templateUrl: 'date-availability-modal.html',
})
export class DateAvailabilityModalPage {
  @Input() data: any;
  @Input() events: any;
  public availableDateFrom;
  public availableDateTo;
  public hasEndDate;

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public viewCtrl: ViewController,
  private myCalendar: CustomCalendarComponent,
  public ref: ChangeDetectorRef) {
    let data = navParams.get('data');
    this.availableDateFrom = data.availableDateFrom;
    this.availableDateTo = data.availableDateTo;
    this.hasEndDate = data.hasEndDate;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DateAvailabilityModalPage');
  }

  openCalendar(isRadio){
    let me = this;
    let calendarOptions = {
      isRadio: isRadio,
      // canBackwardsSelected:false,
    }
    this.myCalendar.openCalendar(calendarOptions).then((datesSelected)=>{
      me.availableDateFrom = datesSelected["date"]["time"];
      me.ref.detectChanges();
      console.log(datesSelected);
    }).catch((error)=>{
      console.error(error);
    });
  }

  openCalendarTo(isRadio){
    let me = this;
    let calendarOptions = {
      isRadio: isRadio,
      // canBackwardsSelected:false,
    }
    this.myCalendar.openCalendar(calendarOptions).then((datesSelected)=>{
      me.availableDateTo = datesSelected["date"]["time"];
      me.ref.detectChanges();
      console.log(datesSelected);
    }).catch((error)=>{
      console.error(error);
    });
  }

  closeModal(): void {
    let dateData: any = {
      availableDateFrom: this.availableDateFrom,
      availableDateTo: this.availableDateTo,
      hasEndDate: this.hasEndDate,
    };
    
    this.viewCtrl.dismiss(dateData).then((data)=>{
      console.log(data);
    }).catch((error)=>{
      console.error(error);
    });
  }

}
