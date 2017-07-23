import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmRentalPage } from './confirm-rental';

@NgModule({
  declarations: [
    ConfirmRentalPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmRentalPage),
  ],
  exports: [
    ConfirmRentalPage
  ]
})
export class ConfirmRentalPageModule {}
