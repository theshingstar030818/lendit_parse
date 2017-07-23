import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RenterPastPage } from './renter-past';

@NgModule({
  declarations: [
    RenterPastPage,
  ],
  imports: [
    IonicPageModule.forChild(RenterPastPage),
  ],
  exports: [
    RenterPastPage
  ]
})
export class RenterPastPageModule {}
