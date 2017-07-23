import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainDashboardPage } from './mainDashboard';
import { MockStructuresProvider } from '../../providers/mock-structures/mock-structures'; 

@NgModule({
  declarations: [
    MainDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(MainDashboardPage),
  ],
  exports: [
    MainDashboardPage
  ],
  providers: [
    MockStructuresProvider,
  ]
})

export class MainDashboardPageModule {}
