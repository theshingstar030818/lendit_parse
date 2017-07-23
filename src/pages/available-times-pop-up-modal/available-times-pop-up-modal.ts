import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AvailableTimesPopUpModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-available-times-pop-up-modal',
  templateUrl: 'available-times-pop-up-modal.html',
})
export class AvailableTimesPopUpModalPage {

  public itemRequested = {};
  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  public viewCtrl: ViewController) {
    this.itemRequested = navParams.data;
    console.log(this.itemRequested);
    this.getAvailableTimesForSelectedDate();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvailableTimesPopUpModalPage');
  }
  
  closeModal(): void {
    this.viewCtrl.dismiss(this.itemRequested);
  }

  //this function should get the date from backend in same format
  //to work propely 
  getAvailableTimesForSelectedDate(){
    let availableTimesForTheSelectedStartDate =  {
      availableTimes : [
        "9:00 A.M - 10:00 A.M",
        "10:00 A.M - 11:00 A.M",
        "11:00 A.M - 12:00 P.M",
      ],
      unavailableTimes : [
        "12:00 P.M - 1:00 P.M",
        "1:00 P.M - 1:35 P.M",
      ]
    };
    this.itemRequested["item"]["times"]["availableTimes"] = availableTimesForTheSelectedStartDate.availableTimes;
    this.itemRequested["item"]["times"]["blackTimes"] = availableTimesForTheSelectedStartDate.unavailableTimes;

  }
}
