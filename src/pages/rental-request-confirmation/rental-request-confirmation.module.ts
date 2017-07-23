import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RentalRequestConfirmationPage } from './rental-request-confirmation';

@NgModule({
  declarations: [
    RentalRequestConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(RentalRequestConfirmationPage),
  ],
  exports: [
    RentalRequestConfirmationPage
  ]
})
export class RentalRequestConfirmationPageModule {}
