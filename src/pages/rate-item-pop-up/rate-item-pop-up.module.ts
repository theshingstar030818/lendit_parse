import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RateItemPopUpPage } from './rate-item-pop-up';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    RateItemPopUpPage,
  ],
  imports: [
    IonicPageModule.forChild(RateItemPopUpPage),
    Ionic2RatingModule
  ],
  exports: [
    RateItemPopUpPage
  ]
})
export class RateItemPopUpPageModule {}
