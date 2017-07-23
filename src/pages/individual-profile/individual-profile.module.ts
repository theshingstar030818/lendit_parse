import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndividualProfilePage } from './individual-profile';
import { Ionic2RatingModule } from 'ionic2-rating';


@NgModule({
  declarations: [
    IndividualProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(IndividualProfilePage),
    Ionic2RatingModule
  ],
  exports: [
    IndividualProfilePage
  ]
})
export class IndividualProfilePageModule {}
