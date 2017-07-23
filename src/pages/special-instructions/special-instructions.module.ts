import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpecialInstructionsPage } from './special-instructions';

@NgModule({
  declarations: [
    SpecialInstructionsPage,
  ],
  imports: [
    IonicPageModule.forChild(SpecialInstructionsPage),
  ],
  exports: [
    SpecialInstructionsPage
  ]
})
export class SpecialInstructionsPageModule {}
