import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickUpAddressModalPage } from './pick-up-address-modal';

@NgModule({
  declarations: [
    PickUpAddressModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PickUpAddressModalPage),
  ],
  exports: [
    PickUpAddressModalPage
  ]
})
export class PickUpAddressModalPageModule {}
