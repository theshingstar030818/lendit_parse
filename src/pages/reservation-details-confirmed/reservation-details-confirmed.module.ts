import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationDetailsConfirmedPage } from './reservation-details-confirmed';

@NgModule({
  declarations: [
    ReservationDetailsConfirmedPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservationDetailsConfirmedPage),
  ],
  exports: [
    ReservationDetailsConfirmedPage
  ]
})
export class ReservationDetailsConfirmedPageModule {}
