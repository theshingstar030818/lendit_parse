import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { GeoLocationServicesProvider } from '../geo-location-services/geo-location-services';

/*
  Generated class for the MockStructuresProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MockStructuresProvider {

  constructor(
    public http: Http,
    public mapService: GeoLocationServicesProvider
  ) {
    console.log('Hello MockStructuresProvider Provider');
  }

  public getMockSearchDataTemplate(){
    let x = {
      location: {
        city: "San Diago",
        geoPoint: {
          lat: "",
          lng: ""
        }
      },
      minPrice: "",
      maxPrice: "",
      productCategory: {
        selected: "Sports & Outdoors",
        categoryList: ["Sports & Outdoors","Tools & Garden","Home","Electronics & Media","Party Equipment","Other"],
      },
      radius: {
        distanceRange: this.getMockDistanceRange(),
        selected: "1"
      },
      minLenderRating: 0,
      keywords: "",
      viewType: "Map" 
    }
    return x;
  }

  public getMockItemRequest(){
    let requestItem = {
      status: "Active",
      itemRentByRadioSelection: "Hourly",
      item : {
        name: "2015 Ski Boat",
        rating: 3,
        rate: {
          Hourly: 2,
          Daily: 3,
          Weekly: 5
        },
        images: [
          "assets/img/stamp1.jpg",
          "assets/img/stamp2.jpg",
          "assets/img/stamp3.jpg",
          "assets/img/stamp4.jpg"
        ],
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        rentByRadioSelection:"Hourly",
        location: {
          stringValue :  "Rue Bedard"
        },
        lender:{
          name: "Mary Johnson",
          rating: 5
        },
        times: {
          blackDates: [
            (new Date(Date.parse("2017-08-01".replace('-','/')))).getTime(),
            (new Date(Date.parse("2017-08-02".replace('-','/')))).getTime(),
            (new Date(Date.parse("2017-08-03".replace('-','/')))).getTime(),
            (new Date(Date.parse("2017-08-12".replace('-','/')))).getTime(),
            (new Date(Date.parse("2017-08-14".replace('-','/')))).getTime(),
            (new Date(Date.parse("2017-08-22".replace('-','/')))).getTime(),
            (new Date(Date.parse("2017-08-29".replace('-','/')))).getTime()
          ]
        }
      },
      selectDateStartDate: new Date().toISOString(),
      selectDateStartTime:"", //from modal
      selectDateEndDate: new Date().toISOString(),  
      selectDateEndTime:"", // from modal
    }
    return requestItem;
  }

  public getMockDistanceRange(){
    let x =  ["1", "2", "3", "4", "5", "6", "7", "8" , "10"];
    return x;
  }

  public getMockItemsList(){
    console.log(this.mapService.currentPositionInfoObj);
    console.log(this.mapService.currentPositionInfoObj.googleData.geometry.location.lat);
    let items = [  
      {
        name: "BMW",
        locationInfo: {
          
        },
        position: {lat : this.mapService.currentPositionInfoObj.googleData.geometry.location.lat + (Math.random()/100), lng : this.mapService.currentPositionInfoObj.googleData.geometry.location.lng + (Math.random()/100)},
        price: 2,
        curency: {value: "USD", sign: "$"},
        rate: "d",
        imageUrl: "assets/img/testImage.png",
      },
      {
        name: "XYZ",
        locationInfo: {
          
        },
        position: {lat : this.mapService.currentPositionInfoObj.googleData.geometry.location.lat + (Math.random()/100), lng : this.mapService.currentPositionInfoObj.googleData.geometry.location.lng + (Math.random()/100)},
        price: 2,
        curency: {value: "USD", sign: "$"},
        rate: "d",
        imageUrl: "assets/img/testImage.png",
      },
      {
        name: "ABC",
        locationInfo: {
          
        },
        position: {lat : this.mapService.currentPositionInfoObj.googleData.geometry.location.lat + (Math.random()/100), lng : this.mapService.currentPositionInfoObj.googleData.geometry.location.lng + (Math.random()/100)},
        price: 2,
        curency: {value: "USD", sign: "$"},
        rate: "d",
        imageUrl: "assets/img/testImage.png",
      },
      {
        name: "BALL",
        locationInfo: {
          
        },
        position: {lat : this.mapService.currentPositionInfoObj.googleData.geometry.location.lat + (Math.random()/100), lng : this.mapService.currentPositionInfoObj.googleData.geometry.location.lng + (Math.random()/100)},
        price: 2,
        curency: {value: "USD", sign: "$"},
        rate: "d",
        imageUrl: "assets/img/testImage.png",
      },
      {
        name: "HAT",
        locationInfo: {
          
        },
        position: {lat : this.mapService.currentPositionInfoObj.googleData.geometry.location.lat + (Math.random()/100), lng : this.mapService.currentPositionInfoObj.googleData.geometry.location.lng + (Math.random()/100)},
        price: 2,
        curency: {value: "BOOK", sign: "$"},
        rate: "d",
        imageUrl: "assets/img/testImage.png",
      },
      {
        name: "KKK",
        locationInfo: {
          
        },
        position: {lat : this.mapService.currentPositionInfoObj.googleData.geometry.location.lat + (Math.random()/100), lng : this.mapService.currentPositionInfoObj.googleData.geometry.location.lng + (Math.random()/100)},
        price: 2,
        curency: {value: "USD", sign: "$"},
        rate: "d",
        imageUrl: "assets/img/testImage.png",
      },
    ]

    return items;
  }
}