import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DateAvailabilityModalPage } from './date-availability-modal';

@NgModule({
  declarations: [
    DateAvailabilityModalPage,
  ],
  imports: [
    IonicPageModule.forChild(DateAvailabilityModalPage),
  ],
  exports: [
    DateAvailabilityModalPage
  ]
})
export class DateAvailabilityModalPageModule {}
