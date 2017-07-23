import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlackoutDatesModalPage } from './blackout-dates-modal';

@NgModule({
  declarations: [
    BlackoutDatesModalPage,
  ],
  imports: [
    IonicPageModule.forChild(BlackoutDatesModalPage),
  ],
  exports: [
    BlackoutDatesModalPage
  ]
})
export class BlackoutDatesModalPageModule {}
