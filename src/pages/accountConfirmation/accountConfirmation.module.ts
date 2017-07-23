import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountConfirmationPage } from './accountConfirmation';

@NgModule({
  declarations: [
    AccountConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountConfirmationPage),
  ],
  exports: [
    AccountConfirmationPage
  ]
})
export class AccountConfirmationPageModule {}
