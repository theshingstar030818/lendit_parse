import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EndRentalPopUpPage } from './end-rental-pop-up';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    EndRentalPopUpPage,
  ],
  imports: [
    IonicPageModule.forChild(EndRentalPopUpPage),
    Ionic2RatingModule,
  ],
  exports: [
    EndRentalPopUpPage
  ]
})
export class EndRentalPopUpPageModule {}
