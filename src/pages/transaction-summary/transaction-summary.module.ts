import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransactionSummaryPage } from './transaction-summary';

@NgModule({
  declarations: [
    TransactionSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(TransactionSummaryPage),
  ],
  exports: [
    TransactionSummaryPage
  ]
})
export class TransactionSummaryPageModule {}
