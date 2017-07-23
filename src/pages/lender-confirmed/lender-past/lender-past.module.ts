import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LenderPastPage } from './lender-past';

@NgModule({
  declarations: [
    LenderPastPage,
  ],
  imports: [
    IonicPageModule.forChild(LenderPastPage),
  ],
  exports: [
    LenderPastPage
  ]
})
export class LenderPastPageModule {}
