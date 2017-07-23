import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RenterConfirmedPage } from './renter-confirmed';

@NgModule({
  declarations: [
    RenterConfirmedPage,
  ],
  imports: [
    IonicPageModule.forChild(RenterConfirmedPage),
  ],
  exports: [
    RenterConfirmedPage
  ]
})
export class RenterConfirmedPageModule {}
