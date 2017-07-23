import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateProfilePicturePage } from './update-profile-picture';

@NgModule({
  declarations: [
    UpdateProfilePicturePage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateProfilePicturePage),
  ],
  exports: [
    UpdateProfilePicturePage
  ]
})
export class UpdateProfilePicturePageModule {}
