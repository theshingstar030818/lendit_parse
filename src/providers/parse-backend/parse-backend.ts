import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {Events} from 'ionic-angular';
import Parse from 'parse';

import { LocalDbProvider } from '../local-db/local-db';
import { ErrorHandlerProvider } from '../error-handler/error-handler';
import { ConnectivityProvider } from '../connectivity/connectivity';

/*
  Generated class for the ParseBackendProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ParseBackendProvider {

  public current: any;

  constructor(
    public http: Http,
    public events: Events,
    public localDB: LocalDbProvider,
    public errorHandler: ErrorHandlerProvider,
    public connectivityService: ConnectivityProvider
) {
    console.log('Hello ParseBackendProvider Provider');
    
    Parse.initialize('FromBucketsToRainBarrels');
    Parse.serverURL = 'http://162.243.118.87:1337/parse';
    this.current = Parse.User.current();
  }

  login(user,pass,context){
    let me = this;
    let args = arguments;
    return new Promise((resolve, reject) => {
      if(me.connectivityService.hasInernet()){
        Parse.User.logIn(user, pass, {
		        success: function(user) {
              me.events.publish("loginSuccess",context);
              resolve(user);
            },
		        error: function(user, error) {
		          me.events.publish("loginFail",context);
              me.errorHandler.handleError(false, error, "login", "ParseProvider", me.getArguments(args));
              reject("error");
            }
		    });
  		}else{
        me.events.publish("loginFail",context);
			  me.errorHandler.handleError(false, {message:"No internet access"}, "login", "ParseProvider", me.getArguments(args));
        reject();
      }
    });
  }
  
  logout(){
  	let me = this;
  	me.current = null;
	  
    Parse.User.logOut().then(
      function(user){

      },function(error){
      	console.error(error);
        me.errorHandler.handleError(false, error, "logout", "ParseBackendProvider", []);
      });
  }
  
  getCurrentUser(){
  	return this.current;
  }

  // name : String,  encoding : base64-encoded 
  getParseFile(name, encoding){
    name = name.replace(/[^a-zA-Z0-9_.]/g, '');
    let parseFile = new Parse.File( name, encoding);
    return parseFile;
  }

  getAsJSON(user){
    return JSON.parse(JSON.stringify(user));
  }
  
  getArguments(a){
    return Array.from(a);
  }

}
