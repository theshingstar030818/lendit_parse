import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PersonalInfoPage } from '../personalInfo/personalInfo';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
@IonicPage()
export class SettingsPage {

  personalInfoRoot = PersonalInfoPage
  billingRoot = 'BillingPage'
  profileRoot = 'ProfilePage'
  paymentRoot = 'PaymentPage'

  constructor(public navCtrl: NavController) {}

}
