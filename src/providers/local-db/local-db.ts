import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';
import Parse from 'parse';

/*
  Generated class for the LocalDbProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocalDbProvider {

  constructor(
    public http: Http,
    public storage: NativeStorage,
  ) {
    console.log('Hello LocalDbProvider Provider');
  }

  get(item){
  	let me = this;
  	return new Promise((resolve, reject) => {
  		me.storage.getItem(item).then((item) => {
	      resolve(item);
	    }).catch((error)=>{
        console.error(error);
        reject(null);
      });
  	});
  }

  save(key,item){
    let me = this;
  	return new Promise((resolve, reject) => {
  		me.storage.setItem(key,item).then((item) => {
	      resolve(item);
	    }).catch((error)=>{
        console.error(error);
        reject(null);
      });
  	});
  }

  saveUser(user){
  	let me = this;
  	me.storage.setItem('user', me.seriallize(user));
  }

  seriallize(obj){
  	return JSON.parse(JSON.stringify(obj));
  }

  //do not deseriallizeUser
  deseriallizeUser(user){
    let me = this;
    let retObj = {};
    
    if(user){
    	//deseriallize user
    	if(Parse.User.current()){user.userParseObj.sessionToken = Parse.User.current().getSessionToken()}
		  user.userParseObj.className = "_User" 
	    retObj = Parse.Object.fromJSON(user.userParseObj);
    }
    console.log("LocalDBService : deseriallizeUser() : " + JSON.stringify(retObj));
    return retObj;
  }

}
