import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LendingPage } from './lending';

@NgModule({
  declarations: [
    LendingPage,
  ],
  imports: [
    IonicPageModule.forChild(LendingPage),
  ],
  exports: [
    LendingPage
  ]
})
export class LendingPageModule {}
