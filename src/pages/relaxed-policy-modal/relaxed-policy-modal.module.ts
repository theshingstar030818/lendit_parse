import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RelaxedPolicyModalPage } from './relaxed-policy-modal';

@NgModule({
  declarations: [
    RelaxedPolicyModalPage,
  ],
  imports: [
    IonicPageModule.forChild(RelaxedPolicyModalPage),
  ],
  exports: [
    RelaxedPolicyModalPage
  ]
})
export class RelaxedPolicyModalPageModule {}
