import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UUID } from 'angular2-uuid';

import { S2RegionCoverer } from "nodes2ts";

import {
  GeoPoint,
  PutPointInput,
  QueryRadiusInput,
  QueryRectangleInput
} from "./types"

import { S2Manager } from "./s2/S2Manager";
import { GeoDataManagerConfiguration } from "./GeoDataManagerConfiguration";

/*
  Generated class for the GeoDataManagerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GeoDataManagerProvider {
  
  private config: GeoDataManagerConfiguration;
  s2RegionCoverer: S2RegionCoverer;
  private uuid = UUID.UUID();
  
  constructor(config: GeoDataManagerConfiguration) {
    this.config = config;
    this.s2RegionCoverer = new S2RegionCoverer();
  }  

  public getGeoDataManagerConfiguration() {
    return this.config;
  }

  /*
    {
      RangeKeyValue: { S: me.uuid }, // Use this to ensure uniqueness of the hash/range pairs.
      GeoPoint: {
          latitude: capital.latitude,
          longitude: capital.longitude
      },
      PutItemInput: {
          Item: {
              country: { S: capital.country },
              capital: { S: capital.capital }
          }
      }
    }
  */

  public putPoint(putPointInput: PutPointInput) {
    const geohash = S2Manager.generateGeohash(putPointInput.GeoPoint);
    const hashKey = S2Manager.generateHashKey(geohash, this.config.hashKeyLength);
    const putItemInput = putPointInput.Item;

    if (!putItemInput.Item) {
      putItemInput.Item = {};
    }

    putItemInput.Item[this.config.hashKeyAttributeName] = { N: hashKey.toString(10) };
    putItemInput.Item[this.config.rangeKeyAttributeName] = putPointInput.RangeKeyValue;
    putItemInput.Item[this.config.geohashAttributeName] = { N: geohash.toString(10) };
    putItemInput.Item[this.config.geoJsonAttributeName] = {
      S: JSON.stringify({
        type: 'POINT',
        coordinates: (this.config.longitudeFirst ?
          [putPointInput.GeoPoint.longitude, putPointInput.GeoPoint.latitude] :
          [putPointInput.GeoPoint.latitude, putPointInput.GeoPoint.longitude])
      })
    };

    console.log("putPoint : ");
    console.log(putItemInput);
  }
}
