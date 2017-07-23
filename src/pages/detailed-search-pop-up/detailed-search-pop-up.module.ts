import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailedSearchPopUpPage } from './detailed-search-pop-up';
import { MockStructuresProvider } from '../../providers/mock-structures/mock-structures';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    DetailedSearchPopUpPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailedSearchPopUpPage),
    Ionic2RatingModule,
  ],
  exports: [
    DetailedSearchPopUpPage
  ],
  providers : [MockStructuresProvider]
})
export class DetailedSearchPopUpPageModule {}
