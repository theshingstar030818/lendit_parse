import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationDetailsPastPage } from './reservation-details-past';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    ReservationDetailsPastPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservationDetailsPastPage),
    Ionic2RatingModule
  ],
  exports: [
    ReservationDetailsPastPage
  ]
})
export class ReservationDetailsPastPageModule {}
