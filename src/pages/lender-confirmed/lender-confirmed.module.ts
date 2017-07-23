import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LenderConfirmedPage } from './lender-confirmed';

@NgModule({
  declarations: [
    LenderConfirmedPage,
  ],
  imports: [
    IonicPageModule.forChild(LenderConfirmedPage),
  ],
  exports: [
    LenderConfirmedPage
  ]
})
export class LenderConfirmedPageModule {}
