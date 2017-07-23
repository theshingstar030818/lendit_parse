import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Geolocation } from '@ionic-native/geolocation';
import { NativeStorage } from '@ionic-native/native-storage';

/*
  Generated class for the GeoLocationServicesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

declare var google;

@Injectable()
export class GeoLocationServicesProvider {

  private watch;
	public currentPositionInfoObj = null;
  private geocoder = new google.maps.Geocoder;
	
  constructor(
    public http: Http,
    private geolocation: Geolocation,
		public nativeStorage: NativeStorage,
  ){
		console.log("hello map service");
		let me = this;
		me.nativeStorage.getItem('currentPositionInfoObject').then((data) =>{
			console.log(data)
			if(!data){
				me.getCurrentLocationInfo();
			}else{
				me.currentPositionInfoObj = data;
			}
		}).catch((error)=>{
			me.getCurrentLocationInfo();
				console.error(error); 
		});
  }
	
	getCurrentLocation(){
		let me = this;
		return new Promise((resolve, reject) => {
			if(this.currentPositionInfoObj){
				resolve(this.currentPositionInfoObj);
			}else{
				me.getCurrentLocationInfo().then((data)=>{
					resolve(data);
				});
			}
		});
	}

	private setCurrentLocation(currentPositionInfoObj){
		this.currentPositionInfoObj = currentPositionInfoObj;
		this.currentPositionInfoObj.googleData.geometry.location.lat = this.currentPositionInfoObj.googleData.geometry.location.lat();
		this.currentPositionInfoObj.googleData.geometry.location.lng = this.currentPositionInfoObj.googleData.geometry.location.lng();
		this.nativeStorage.setItem('currentPositionInfoObject',currentPositionInfoObj).then((data) =>{}).catch((error)=>{
			console.warn("unable to stored current location info object to local store");
			console.error(error);
		});
	}

	private getCurrentLocationInfo(){
		let me = this;
		return new Promise((resolve, reject) => {
			me.getCurrentLocationGeoPoint().then((position)=>{
					me.reverseSearchAddress(position[0],position[1]).then((results)=>{
						resolve(me.updateCurrentLocation(results));
					}).catch((error)=>{
						console.error(error);
						reject(error);
					});
			}).catch((error)=>{
				console.log("Error getCurrentLocationGeoPoint");
				console.error(error);
				reject(error);
			});
		});
	}

	changeCurrentLocation(alertCtrl){
    let me = this;
	  return new Promise((resolve, reject) => {
		  this.getChangeCurrentLocationPrompt(alertCtrl,true).then((address)=>{
	      me.searchAddress(address).then((data)=>{
	        let callbacks = {
	  				cancelHandler: data => {
	  					console.log('cancel button presses');
							reject('cancel button presses');
	  				},
	  				confirmHandler: data => {
	            resolve(me.updateCurrentLocation(data['data']));
	  				},
	  			};
	        me.getAddressSelectPrompt(data, callbacks, alertCtrl, true);
	      }).catch((error)=>{
	          me.defaultNoLocationFoundPrompt(alertCtrl,true).then(()=>{
	            me.changeCurrentLocation(alertCtrl).then((data)=>{
								resolve(data);
							}).catch((error)=>{
								reject(error);
							});
	          }).catch((error)=>{
			        reject(error);
	          });
	      });
	    }).catch((error)=>{
	      console.error(error);
				reject(error);
	    });    
		});
  }

  getCurrentLocationGeoPoint(){
    let me = this;
    return new Promise((resolve, reject) => {
      me.geolocation.getCurrentPosition().then((resp) => {
       resolve([resp.coords.latitude, resp.coords.longitude]);
      }).catch((error) => {
        console.error(error);
        reject(error);
      });
    });
  }

  watchPosition(){
    let me = this;
    me.watch = me.geolocation.watchPosition();
    me.watch.subscribe((data) => {
      console.log([data.coords.latitude, data.coords.longitude]);
    });
  }

  stopWatchPosition(){
    let me = this;
    me.watch.unsubscribe();
  }

  reverseSearchAddress(lat, lng){	
		return new Promise((resolve, reject) => {
	      this.geocoder.geocode({'location': {lat: lat, lng: lng}}, function(results, status) {
	        if (status === 'OK') {
	          if (results[1]) {
	            resolve(results);
	          } else {
	            reject('No results found');
	          }
	        } else {
	          reject('Geocoder failed due to: ' + status);
	        }
	      });
	    });   
	}

	searchAddress(address){
	    return new Promise((resolve, reject) => {
	      this.geocoder.geocode({'address': address}, function(results, status) {
	        if (status === 'OK') {
	          if (results[0]) {
	            resolve(results);
	          } else {
	            reject('No results found');
	          }
	        } else {
	          reject('Geocoder failed due to: ' + status);
	        }
	      });
	    });
	}

	/*
		currentLocationInfoObj = {
			address: results, <-- google address object
			mapOptions : {
				center: new google.maps.LatLng(position[0], position[1]),
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
		}
	*/
	updateCurrentLocation(data){
		let me = this;
		let defaultAddressObj = me.getDefaultAddressObject(data);
		let currentLocationInfoObj = {
			googleData: data[0],
			address: defaultAddressObj, 
			mapOptions : {
				center: new google.maps.LatLng(data[0].geometry.location.lat(), data[0].geometry.location.lng()),
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
		}
		me.setCurrentLocation(currentLocationInfoObj);
		return currentLocationInfoObj;		
	}

	private getDefaultAddressObject(googleObj){
		let retDefaultAddObj:any = {};
		console.log(googleObj);
		for(let addObj of googleObj[0].address_components){
			if(addObj.types.indexOf("locality") != -1 || addObj.types.indexOf("administrative_area_level_1") != -1 ){
				retDefaultAddObj = addObj;
				break;
			}
		}
		return retDefaultAddObj;
	}

  getAddressSelectPrompt(data, callbacks, alertCtrl:any, shouldPresent:boolean){
		let inputs = [];
		for (let address of data) {
		  inputs.push({
		    type: 'radio',
		    label: address.formatted_address,
		    value: address,
		    checked: false
		  });
		}

		let addressSelectPrompt = alertCtrl.create({
		  "title": "Confirm Address",
		  "inputs": inputs,
		  buttons: [
		    {
		      text: 'Cancel',
		      handler: ()=> {
		        callbacks.cancelHandler({data: data})
		      }
		    },
		    {
		      text: 'Confirm',
		      handler: (selected) => {
						if(selected){
							callbacks.confirmHandler({data: [selected]});
						}else{
							return false;
						}
		        
		      }
		    }
		  ]
		});
		
		if(shouldPresent){
			addressSelectPrompt.present();
		}else{
			return addressSelectPrompt;
		}			
	}

	getChangeCurrentLocationPrompt(alertCtrl:any, shouldPresent:boolean){
		return new Promise((resolve, reject) => {
			let me = this;
			let prompt = alertCtrl.create({
	      title: 'Change Location ?',
	      message: "Enter an address/city/postal code for your new location.",
	      inputs: [
	        {
	          name: 'title',
	          placeholder: 'Title'
	        },
	      ],
	      buttons: [
	        {
	          text: 'Cancel',
	          handler: data => {
	            console.log('Cancel clicked');
							reject('Cancel clicked');
	          }
	        },
	        {
	          text: 'Search',
	          handler: data => {
							resolve( data['title'] );
	          }
	        }
	      ]
	    });
			if(shouldPresent){
				prompt.present();
			}else{
				resolve(prompt);
			}			
		});
	}

	defaultNoLocationFoundPrompt(alertCtrl:any, shouldPresent:boolean){
		return new Promise((resolve, reject) => {
			let me = this;
			let prompt = alertCtrl.create({
	      title: 'No Results!',
	      message: "Enter another address/city/postal code?",
	      buttons: [
	        {
	          text: 'No',
	          handler: data => {
	            console.log('No clicked');
							reject();
	          }
	        },
	        {
	          text: 'Try Again',
	          handler: data => {
							console.log('Try Again Clicked');
							resolve()
	          }
	        }
	      ]
	    });
			prompt.present();
		});
	}	

}
