import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountVerificationPage } from './accountVerification';

@NgModule({
  declarations: [
    AccountVerificationPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountVerificationPage),
  ],
  exports: [
    AccountVerificationPage
  ]
})
export class AccountVerificationPageModule {}
