import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RentalDetailsActivePage } from './rental-details-active';

@NgModule({
  declarations: [
    RentalDetailsActivePage,
  ],
  imports: [
    IonicPageModule.forChild(RentalDetailsActivePage),
  ],
  exports: [
    RentalDetailsActivePage
  ]
})
export class RentalDetailsActivePageModule {}
