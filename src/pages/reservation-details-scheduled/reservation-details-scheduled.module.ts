import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationDetailsScheduledPage } from './reservation-details-scheduled';

@NgModule({
  declarations: [
    ReservationDetailsScheduledPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservationDetailsScheduledPage),
  ],
  exports: [
    ReservationDetailsScheduledPage
  ]
})
export class ReservationDetailsScheduledPageModule {}
