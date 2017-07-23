import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { MainDashboardPage } from '../mainDashboard/mainDashboard';

/**
 * Generated class for the DashboardPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
@IonicPage()
export class DashboardPage {
  homeRoot = MainDashboardPage
  rentingRoot = 'RentingPage'
  lendingRoot = 'LendingPage'
  inboxRoot = 'InboxPage'


  constructor(public navCtrl: NavController) {}

}
