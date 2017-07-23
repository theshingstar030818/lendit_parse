import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';

/*
  Generated class for the ErrorHandlerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ErrorHandlerProvider {

  constructor(
    public http: Http,
    public events: Events,
  ) {
    console.log('Hello ErrorHandlerProvider Provider');
  }
  
  /*
  
    !!! IMPORTANT !!!

    retry: Boolean, 
      if true handleError will pass function to synchronizer service with the provided contect and arguments
    error: Object or null,
      if not null will publish event 'error-handler-service-event' with error.message
    function: function call,
      the function which called the handleError
    context: function context,
      the context (this) of the funcion that called the handleError
    args: Array
      the array of arguments for the function that called the handleError
  
  */
  handleError(retry,error,f,context,args){
    let now = Date();
    let obj = {
      id: now.toString()+"_"+f,
      retry: retry,
      error:error,
      function: f,
      context: context,
      args: args
    };
    console.log(obj);
    if(obj.error){
      console.error(error);
      this.events.publish('error-handler-service-event', obj.error.message);
    }

    // add this later, for now get this shit working

    // this.connectivityService.testInternetAccess();    
    // if(obj.retry){
    //   this.syncService.addToJobsQueue(obj);
    //   // setTimeout(function(obj){
    //   //   var login = wrapFunction(obj.function, obj.context, obj.args);
    //   //   (login)();
    //   // }, 5000, obj);
    // }
  }

}

var wrapFunction = function(fn, context, params) {
    return function() {
        fn.apply(context, params);
    };
}