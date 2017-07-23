import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostNewItemPage } from './post-new-item';
import { CommonModule } from '@angular/common';  

@NgModule({
  declarations: [
    PostNewItemPage,
  ],
  imports: [
    IonicPageModule.forChild(PostNewItemPage),
    CommonModule,
  ],
  exports: [
    PostNewItemPage
  ]
})
export class PostNewItemPageModule {}
