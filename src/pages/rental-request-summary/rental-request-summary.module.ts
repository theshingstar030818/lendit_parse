import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RentalRequestSummaryPage } from './rental-request-summary';

@NgModule({
  declarations: [
    RentalRequestSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(RentalRequestSummaryPage),
  ],
  exports: [
    RentalRequestSummaryPage
  ]
})
export class RentalRequestSummaryPageModule {}
