import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemCostPage } from './item-cost';

@NgModule({
  declarations: [
    ItemCostPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemCostPage),
  ],
  exports: [
    ItemCostPage
  ]
})
export class ItemCostPageModule {}
