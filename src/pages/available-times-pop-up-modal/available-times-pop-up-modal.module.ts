import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvailableTimesPopUpModalPage } from './available-times-pop-up-modal';

@NgModule({
  declarations: [
    AvailableTimesPopUpModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AvailableTimesPopUpModalPage),
  ],
  exports: [
    AvailableTimesPopUpModalPage
  ]
})
export class AvailableTimesPopUpModalPageModule {}
