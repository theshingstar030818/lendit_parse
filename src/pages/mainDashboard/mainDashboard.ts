import { Component, Input } from '@angular/core';
import { IonicPage, ViewController, AlertController, NavController, ModalController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Events } from 'ionic-angular';
import { MockStructuresProvider } from '../../providers/mock-structures/mock-structures';
import { GeoLocationServicesProvider } from './../../providers/geo-location-services/geo-location-services';
import { SearchProvider } from '../../providers/search/search';

@IonicPage()
@Component({
  selector: 'page-main-dashboard',
  templateUrl: 'mainDashboard.html',
})
export class MainDashboardPage {
  
  public nameShow;
  private sideMenuImage: HTMLImageElement;
  private base_uri: string;
  private userEmail: string;
  private profilePictureUri;
  private name;
  private userId: string;
  public searchData: any;
  private detailedSearchPopUpPageModal;
  menu = {
    items: [
      {
        name: "BMW",
        latLng: {lat:"",lng:""},
        price: 2,
        curency: "USD",
        rate: "d",
        imageUrl: "assets/img/stamp1.jpg",
      },
      {
        name: "BMW",
        latLng: {lat:"",lng:""},
        price: 2,
        curency: "USD",
        rate: "d",
        imageUrl: "assets/img/stamp1.jpg",
      },
      {
        name: "BMW",
        latLng: {lat:"",lng:""},
        price: 2,
        curency: "USD",
        rate: "d",
        imageUrl: "assets/img/stamp1.jpg",
      },
      {
        name: "BMW",
        latLng: {lat:"",lng:""},
        price: 2,
        curency: "USD",
        rate: "d",
        imageUrl: "assets/img/stamp1.jpg",
      },
      {
        name: "BMW",
        latLng: {lat:"",lng:""},
        price: 2,
        curency: "USD",
        rate: "d",
        imageUrl: "assets/img/stamp1.jpg",
      },
      {
        name: "BMW",
        latLng: {lat:"",lng:""},
        price: 2,
        curency: "USD",
        rate: "d",
        imageUrl: "assets/img/stamp1.jpg",
      },
    ]
  }
  search = {
    itemCategorySelected: "Cars",
    distanceRangeSelected: "1",
    options: {
      itemCategories: ["Cars","Toys","Electronics","Drugs","Guns"],
      distanceRange: ["1", "2", "3", "4", "5", "6", "7", "8" , "10"]
    }
  }


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public nativeStorage: NativeStorage,
    public events: Events,
    public mockStructuresProvider: MockStructuresProvider,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public mapsService: GeoLocationServicesProvider,
    public alertCtrl: AlertController,
    public searchService: SearchProvider
  ) {
    this.searchData = this.searchService.searchData;
  }

  viewItem(item){
    this.navCtrl.push("ItemDetailsPage",item);
    console.log(item)
  }

  
  goToPage(page): void {
    this.navCtrl.push(page);
  }

  openSearchModal(){
    let me = this;
    this.detailedSearchPopUpPageModal = this.modalCtrl.create("DetailedSearchPopUpPage",this.searchData)
    this.detailedSearchPopUpPageModal.onDidDismiss((searchData)=>{
      me.searchData = searchData;
      if(searchData.viewType != ""){
        me.navCtrl.push(searchData.viewType+"SearchResultViewPage", me.searchData).then(()=>{
          const index = this.viewCtrl.index;          
        });
      }
    });
    this.detailedSearchPopUpPageModal.present();
  }

  changeCurrentLocation(){
    let me = this;
    this.mapsService.getChangeCurrentLocationPrompt(me.alertCtrl,true).then((address)=>{
      me.mapsService.searchAddress(address).then((data)=>{
        let callbacks = {
  				cancelHandler: data => {
  					console.log('cancel button presses');
  				},
  				confirmHandler: data => {
            console.log(data);
            me.mapsService.updateCurrentLocation(data['data']);
  				},
  			};
        me.mapsService.getAddressSelectPrompt(data, callbacks, me.alertCtrl, true);
        
      }).catch((error)=>{
          //on failure handlers here
          me.mapsService.defaultNoLocationFoundPrompt(me.alertCtrl,true).then(()=>{
            me.changeCurrentLocation();
          }).catch(()=>{
            
          });
      });
    }).catch((error)=>{
      console.error(error);
    });    
  }

}
