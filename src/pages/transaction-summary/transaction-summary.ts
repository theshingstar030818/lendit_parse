import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TransactionSummaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-transaction-summary',
  templateUrl: 'transaction-summary.html',
})
export class TransactionSummaryPage {
  
  pageTitle = "Transaction Summary";

  item = {
    date: new Date().toISOString(),
    name:"Bike",
    totalCost: "$15.00"
  };

  transaction = [this.item,this.item,this.item];
  itemDate = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionSummaryPage');
  }

}
