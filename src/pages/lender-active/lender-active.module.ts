import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LenderActivePage } from './lender-active';

@NgModule({
  declarations: [
    LenderActivePage,
  ],
  imports: [
    IonicPageModule.forChild(LenderActivePage),
  ],
  exports: [
    LenderActivePage
  ]
})
export class LenderActivePageModule {}
