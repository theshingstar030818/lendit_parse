import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { SearchProvider } from '../../providers/search/search';
import { GeoLocationServicesProvider } from './../../providers/geo-location-services/geo-location-services';
/**
 * Generated class for the MapSearchResultViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var google; 

@IonicPage()
@Component({
  selector: 'page-map-search-result-view',
  templateUrl: 'map-search-result-view.html',
})
export class MapSearchResultViewPage {

  public searchData: any = {};
  private detailedSearchPopUpPageModal;
	private mapElement = document.getElementsByClassName('googlemap')[document.getElementsByClassName('googlemap').length-1];
	private googlemap: any;
	private mapInitialised: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
		public modalCtrl: ModalController,
    public searchService: SearchProvider,
    public mapsService: GeoLocationServicesProvider,
  ) {
    this.searchData = this.searchService.searchData;
    console.log(searchService.searchData);
    this.searchData = searchService.getCurrentSearchData().then(()=>{
      this.searchData= searchService.searchData;
      console.log(searchService.searchData);
    }).catch((error)=>{
      console.error(error);
      this.searchData= searchService.searchData;
      console.log(searchService.searchData);
    });
    
  }

  ionViewWillLoad(){
    console.log(this.searchService.searchData);
    this.searchData = this.searchService.searchData;
  }

  ionViewWillLeave(){
    // this.navCtrl.remove(this.navCtrl.length()-2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapSearchResultViewPage');
    this.mapElement = document.getElementsByClassName('googlemap')[document.getElementsByClassName('googlemap').length-1];
		console.log(this.mapElement)
    this.initMap();
  }

  initMap(){
		let me = this;
		me.mapInitialised = true;
		me.googlemap = new google.maps.Map(me.mapElement, me.mapsService.currentPositionInfoObj['mapOptions']);
    me.addCurrentLocationMarker(me.mapsService.currentPositionInfoObj['mapOptions']['center'], me.mapsService.currentPositionInfoObj['address']['short_name']);
    me.loadItemMarkersToMap();
	}
  
  //add current location simple marker
  addCurrentLocationMarker(position, content){
	  let marker = new google.maps.Marker({
	    map: this.googlemap,
	    animation: google.maps.Animation.DROP,
	    position: this.googlemap.getCenter()
	  });    
    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');     
	  this.addInfoWindow(marker, content);
	}

	addInfoWindow(marker, content){
	  let me = this;
    let infoWindow = new google.maps.InfoWindow({
	    content: content
    });
	  google.maps.event.addListener(marker, 'click', () => {
	    infoWindow.open(this.googlemap, marker);
	  });
	}

  goToPage(page): void {
      this.navCtrl.push(page);
  }

  openSearchModal(){
    let me = this;
    this.detailedSearchPopUpPageModal = this.modalCtrl.create("DetailedSearchPopUpPage",this.searchData)
    this.detailedSearchPopUpPageModal.onDidDismiss((searchData)=>{
      console.log(searchData);
      me.searchData = searchData;
      if(searchData.viewType != ""  && searchData.viewType != "Map" ){
        me.navCtrl.push(searchData.viewType+"SearchResultViewPage");
      }else{
        // load results from backend onto the map 
        me.loadItemMarkersToMap();
      }
    });
    this.detailedSearchPopUpPageModal.present();
  }

	loadItemMarkersToMap(){
    let me = this;
    
    me.searchService.doSearch().then((items)=>{
      for(let i=0; i<(<any>items).length; i++){
        console.log(items[i]);
        let marker = new google.maps.Marker({
    	    map: me.googlemap,
    	    animation: google.maps.Animation.DROP,
    	    position: items[i]['position']
    	  });         
    	  me.addInfoWindow(marker, me.getItemMarkerInfoWindowContent(items[i]));
      }
    }).catch((error)=>{
      console.error(error);
    });
  }

  editLocation(){
    let me = this;
    this.mapsService.changeCurrentLocation(this.alertCtrl).then((data)=>{
      me.initMap();
    }).catch((error)=>{
      console.error(error);
    });
  }
          
  getItemMarkerInfoWindowContent(item){
    let content = `<div class="list-items">
          <div class="item-menu">
              
              <img (click)="viewItem()" src="`+item['imageUrl']+`"/>

              <div class="overlay">
                <span class="pull-left" color="light">
                  `+item['name']+` - 
                </span>
                <span class="pull-right" color="light">
                  `+ item['curency']['sign'] + " " + item['price'] +`
                </span>
              </div>

            </div>
          </div>
        </div>`;
    return content;
  }

}
