import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-time-availability-modal',
  templateUrl: 'time-availability-modal.html',
})
export class TimeAvailabilityModalPage {
  @Input() data: any;
  @Input() events: any;
  public monFrom;
  public monTo;
  public tueFrom;
  public tueTo;
  public wedFrom;
  public wedTo;
  public thursFrom;
  public thursTo;
  public friFrom;
  public friTo;
  public satFrom;
  public satTo;
  public sunFrom;
  public sunTo;
  private sameAsAbove;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.monFrom = navParams.get('monFrom');
    this.monTo = navParams.get('monTo');
    this.tueFrom = navParams.get('tueFrom');
    this.tueTo = navParams.get('tueTo');
    this.wedFrom = navParams.get('wedFrom');
    this.wedTo = navParams.get('wedTo');
    this.thursFrom = navParams.get('thursFrom');
    this.thursTo = navParams.get('thursTo');
    this.friFrom = navParams.get('friFrom');
    this.friTo = navParams.get('friTo');
    this.satFrom = navParams.get('satFrom');
    this.satTo = navParams.get('satTo');
    this.sunFrom = navParams.get('sunFrom');
    this.sunTo = navParams.get('sunTo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeAvailabilityModalPage');
  }
  updateValues():void{
    if(!this.sameAsAbove){
      this.tueFrom = "";
      this.tueTo = "";
      this.wedFrom = "";
      this.wedTo = "";
      this.thursFrom = "";
      this.thursTo = "";
      this.friFrom = "";
      this.friTo = "";
      this.satFrom = "";
      this.satTo = "";
      this.sunFrom = "";
      this.sunTo = "";
    }
    else{
      this.tueFrom = this.monFrom;
      this.tueTo = this.monTo;
      this.wedFrom = this.monFrom;
      this.wedTo = this.monTo;
      this.thursFrom = this.monFrom;
      this.thursTo = this.monTo;
      this.friFrom = this.monFrom;
      this.friTo = this.monTo;
      this.satFrom = this.monFrom;
      this.satTo = this.monTo;
      this.sunFrom = this.monFrom;
      this.sunTo = this.monTo;
    }
  }

  closeModal(): void {
    let timeData: any = {
      monFrom: this.monFrom,
      monTo: this.monTo,
      tueFrom: this.tueFrom,
      tueTo: this.tueTo,
      wedFrom: this.wedFrom,
      wedTo: this.wedTo,
      thursFrom: this.thursFrom,
      thursTo: this.thursTo,
      friFrom: this.friFrom,
      friTo: this.friTo,
      satFrom: this.satFrom,
      satTo: this.satTo,
      sunFrom: this.sunFrom,
      sunTo: this.sunTo
    };
    this.viewCtrl.dismiss(timeData);
  }
}
