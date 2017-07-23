import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RentalConfirmationPage } from './rental-confirmation';

@NgModule({
  declarations: [
    RentalConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(RentalConfirmationPage),
  ],
  exports: [
    RentalConfirmationPage
  ]
})
export class RentalConfirmationPageModule {}
