import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemBookingSchedulePage } from './item-booking-schedule';

@NgModule({
  declarations: [
    ItemBookingSchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(ItemBookingSchedulePage),
  ],
  exports: [
    ItemBookingSchedulePage
  ]
})
export class ItemBookingSchedulePageModule {}
