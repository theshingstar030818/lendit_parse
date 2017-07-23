import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RenterActivePage } from './renter-active';

@NgModule({
  declarations: [
    RenterActivePage,
  ],
  imports: [
    IonicPageModule.forChild(RenterActivePage),
  ],
  exports: [
    RenterActivePage
  ]
})
export class RenterActivePageModule {}
