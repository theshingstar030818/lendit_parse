import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StrictPolicyModalPage } from './strict-policy-modal';

@NgModule({
  declarations: [
    StrictPolicyModalPage,
  ],
  imports: [
    IonicPageModule.forChild(StrictPolicyModalPage),
  ],
  exports: [
    StrictPolicyModalPage
  ]
})
export class StrictPolicyModalPageModule {}
