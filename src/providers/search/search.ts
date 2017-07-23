import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { MockStructuresProvider } from '../mock-structures/mock-structures';
import { NativeStorage } from '@ionic-native/native-storage';

/*
  Generated class for the SearchProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SearchProvider {

  public searchData : any = {}
  public searchResults = [];

  constructor(
    public http: Http,
    public mockStructuresProvider: MockStructuresProvider,
    public nativeStorage: NativeStorage,
  ) {
    console.log('Hello SearchProvider Provider');
    
    this.getCurrentSearchData();
  }
  
  getCurrentSearchData(){
    let me = this;
    return new Promise((resolve, reject) => {
      me.nativeStorage.getItem('currentSearchData').then((data) =>{
  			console.log(data)
  			if(data){
  				me.searchData = data;
  			}else{
  				me.searchData = me.mockStructuresProvider.getMockSearchDataTemplate();
  			}
        resolve(me.searchData);
  		}).catch((error)=>{
  			me.searchData = me.mockStructuresProvider.getMockSearchDataTemplate();
        resolve(me.searchData);        
  		});
    });
  }

  storeCurrentSearchData(){
		let me = this;
    return new Promise((resolve, reject) => {
      console.log("storing searchdata ....");
      console.log(me.searchData);
      me.nativeStorage.setItem('currentSearchData',me.searchData).then((data) =>{
        me.searchData = data;
        console.log(me.searchData);

        resolve(data);
      }).catch((error)=>{
  			console.warn("unable to stored current search data object to local store");
  			console.error(error);
        reject(error);
  		});
    });

  		
	}
  
  public doSearch(){
    let me = this;
    return new Promise((resolve, reject) => {
      me.searchResults = me.mockStructuresProvider.getMockItemsList();
      resolve(me.mockStructuresProvider.getMockItemsList());
    });
  }
}
