import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { SearchProvider } from '../../providers/search/search';
import { GeoLocationServicesProvider } from './../../providers/geo-location-services/geo-location-services';


/**
 * Generated class for the IndividualProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-individual-profile',
  templateUrl: 'individual-profile.html',
})
export class IndividualProfilePage {

  individualProfile = {
    name: "",
    totalEarnings: "",
    location: "",
    rating: 0
  };

  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
		public modalCtrl: ModalController,
    public searchService: SearchProvider,
    public mapsService: GeoLocationServicesProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndividualProfilePage');
  }
  
  ionViewWillLoad() {
    console.log('ionViewDidLoad IndividualProfilePage');
    this.getIndividualProfileInfo();
  }

  getIndividualProfileInfo(){
    console.log("initList . . . ");
    let me = this;
    me.individualProfile = {
      name: "Sara Jones",
      totalEarnings: "$15.00",
      location: "Mission Beach",
      rating: 3.5
    }

    me.searchService.doSearch().then((items)=>{
      for(let i=0; i<(<any>items).length; i++){
        console.log(items[i]);
      }
    }).catch((error)=>{
      console.error(error);
    });
  }

}
