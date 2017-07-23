import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModeratePolicyModalPage } from './moderate-policy-modal';

@NgModule({
  declarations: [
    ModeratePolicyModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ModeratePolicyModalPage),
  ],
  exports: [
    ModeratePolicyModalPage
  ]
})
export class ModeratePolicyModalPageModule {}
