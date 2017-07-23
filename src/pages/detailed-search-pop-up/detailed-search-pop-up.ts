import { Component } from '@angular/core';
import { IonicPage, ViewController,  NavController, ModalController, NavParams } from 'ionic-angular';
import { MockStructuresProvider } from '../../providers/mock-structures/mock-structures';
import { SearchProvider } from '../../providers/search/search';

/**
 * Generated class for the DetailedSearchPopUpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detailed-search-pop-up',
  templateUrl: 'detailed-search-pop-up.html',
})

export class DetailedSearchPopUpPage {

  public searchData : any = {
    minPrice: "",
    maxPrice: "",
    productCategory: {
      selected: "",
      categoryList: [],
    },
    minLenderRating: 0,
    keywords: "",
    viewType: "" 
  };

  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController, 
    public navParams: NavParams,
    public mockStructuresProvider: MockStructuresProvider,
    public modalCtrl: ModalController,
    public searchService: SearchProvider
  ) {
    // if(navParams.data != null){
    //   this.searchData = searchService.searchData;
    // }
    this.searchData = searchService.searchData;
    console.log(searchService.searchData);
  }

  ionViewWillLoad(){
    console.log(this.searchService.searchData);
    this.searchData = this.searchService.searchData;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailedSearchPopUpPage');
  }

  closeModal(): void {
    this.searchData.viewType = "";
    this.viewCtrl.dismiss(this.searchData);
  }

  onRatingModelChange(event){
    console.log(event);
  }

  doSearch(){
    let me = this;
    this.searchService.storeCurrentSearchData().then((storedSearchData)=>{
      this.viewCtrl.dismiss(storedSearchData).then((data)=>{
        console.log("dismiss complete on details-search-pop=up");
        console.log(data);
      }).catch((error)=>{
        console.error(error);
      });
    }).catch((error)=>{

    });
      
  }

}
