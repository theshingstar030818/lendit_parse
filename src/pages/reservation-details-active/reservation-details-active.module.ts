import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationDetailsActivePage } from './reservation-details-active';

@NgModule({
  declarations: [
    ReservationDetailsActivePage,
  ],
  imports: [
    IonicPageModule.forChild(ReservationDetailsActivePage),
  ],
  exports: [
    ReservationDetailsActivePage
  ]
})
export class ReservationDetailsActivePageModule {}
