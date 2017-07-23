import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ItemCostPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-item-cost',
  templateUrl: 'item-cost.html',
})
export class ItemCostPage {
  @Input() data: any;
  @Input() events: any;
  public chargeBy;
  public hourCost;
  public dayCost;
  public weekCost;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
        var dataFromPage = navParams.get('data');
        this.chargeBy = "hour";
        this.hourCost = "";
        this.dayCost = "";
        this.weekCost = "";


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemCostPage');
  }
  closeModal(): void {
    let costData: any = {
        chargeBy: this.chargeBy,
        hourCost: this.hourCost,
        dayCost: this.dayCost,
        weekCost: this.weekCost
      };
    this.viewCtrl.dismiss(costData);
  }
}
