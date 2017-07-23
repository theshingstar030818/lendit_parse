import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomCalendarComponent } from './custom-calendar';
import { CalendarController } from '../ion2-calendar/calendar.controller';


@NgModule({
  entryComponents: [
  ],
  declarations: [
    CustomCalendarComponent,
    CalendarController,
  ],
  imports: [
    IonicPageModule.forChild(CustomCalendarComponent),
  ],
  exports: [
    CustomCalendarComponent
  ],
  providers : [
    CalendarController,
    // CalendarService
  ]
})
export class CustomCalendarComponentModule {}
