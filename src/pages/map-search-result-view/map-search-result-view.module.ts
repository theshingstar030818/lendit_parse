import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapSearchResultViewPage } from './map-search-result-view';

@NgModule({
  declarations: [
    MapSearchResultViewPage,
  ],
  imports: [
    IonicPageModule.forChild(MapSearchResultViewPage),
  ],
  exports: [
    MapSearchResultViewPage
  ],
  providers : []
})
export class MapSearchResultViewPageModule {}
