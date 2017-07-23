import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmPostDetailsPage } from './confirm-post-details';
@NgModule({
  declarations: [
    ConfirmPostDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmPostDetailsPage),
  ],
  exports: [
    ConfirmPostDetailsPage
  ]
})
export class ConfirmPostDetailsPageModule {}