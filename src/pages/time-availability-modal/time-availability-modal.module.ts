import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimeAvailabilityModalPage } from './time-availability-modal';

@NgModule({
  declarations: [
    TimeAvailabilityModalPage,
  ],
  imports: [
    IonicPageModule.forChild(TimeAvailabilityModalPage),
  ],
  exports: [
    TimeAvailabilityModalPage
  ]
})
export class TimeAvailabilityModalPageModule {}
