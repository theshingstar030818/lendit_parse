import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetailsPage } from './item-details';
import { Ionic2RatingModule } from 'ionic2-rating';
import { CustomCalendarComponent } from '../../components/custom-calendar/custom-calendar';

@NgModule({
  declarations: [
    ItemDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetailsPage),
    Ionic2RatingModule
  ],
  exports: [
    ItemDetailsPage
  ],
  providers: [
    CustomCalendarComponent,
  ]
})
export class ItemDetailsPageModule {}
