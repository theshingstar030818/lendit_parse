import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListSearchResultViewPage } from './list-search-result-view';

@NgModule({
  declarations: [
    ListSearchResultViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ListSearchResultViewPage),
  ],
  exports: [
    ListSearchResultViewPage
  ]
})
export class ListSearchResultViewPageModule {}
