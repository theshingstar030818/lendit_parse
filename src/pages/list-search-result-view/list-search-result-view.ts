import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { SearchProvider } from '../../providers/search/search';
import { GeoLocationServicesProvider } from './../../providers/geo-location-services/geo-location-services';

/**
 * Generated class for the ListSearchResultViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var google; 

@IonicPage()
@Component({
  selector: 'page-list-search-result-view',
  templateUrl: 'list-search-result-view.html',
})
export class ListSearchResultViewPage {

  public searchData: any = {};
  private detailedSearchPopUpPageModal;

  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
		public modalCtrl: ModalController,
    public searchService: SearchProvider,
    public mapsService: GeoLocationServicesProvider,
  ) {
    this.searchData = searchService.getCurrentSearchData().then(()=>{
      this.searchData= searchService.searchData;
    }).catch((error)=>{
      console.error(error);
      this.searchData = searchService.searchData;
    });
  }

  ionViewWillLeave(){}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapSearchResultViewPage');
    this.initList();
  }

  goToPage(page): void {
      this.navCtrl.push(page);
  }

  openSearchModal(){
    let me = this;
    this.detailedSearchPopUpPageModal = this.modalCtrl.create("DetailedSearchPopUpPage",this.searchData)
    this.detailedSearchPopUpPageModal.onDidDismiss((searchData)=>{
      me.searchData = searchData;
      if(searchData.viewType != ""  && searchData.viewType != "Map" ){
        me.navCtrl.push(searchData.viewType+"SearchResultViewPage");
      }else{
        me.initList();
      }
    });
    this.detailedSearchPopUpPageModal.present();
  }

  initList(){
    console.log("initList . . . ");
    let me = this;
    me.searchService.doSearch().then((items)=>{
      for(let i=0; i<(<any>items).length; i++){
        console.log(items[i]);
      }
    }).catch((error)=>{
      console.error(error);
    });
  }

  editLocation(){
    let me = this;
    this.mapsService.changeCurrentLocation(this.alertCtrl).then((data)=>{
      me.initList();
    }).catch((error)=>{
      console.error(error);
    });
  }

}
