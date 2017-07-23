import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationDetailsPage } from './reservation-details';

@NgModule({
  declarations: [
    ReservationDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservationDetailsPage),
  ],
  exports: [
    ReservationDetailsPage
  ]
})
export class ReservationDetailsPageModule {}
