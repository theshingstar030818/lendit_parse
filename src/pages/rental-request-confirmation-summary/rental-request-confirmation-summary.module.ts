import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RentalRequestConfirmationSummaryPage } from './rental-request-confirmation-summary';

@NgModule({
  declarations: [
    RentalRequestConfirmationSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(RentalRequestConfirmationSummaryPage),
  ],
  exports: [
    RentalRequestConfirmationSummaryPage
  ]
})
export class RentalRequestConfirmationSummaryPageModule {}
