import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdditionalInfoModalPage } from './additional-info-modal';

@NgModule({
  declarations: [
    AdditionalInfoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AdditionalInfoModalPage),
  ],
  exports: [
    AdditionalInfoModalPage
  ]
})
export class AdditionalInfoModalPageModule {}
