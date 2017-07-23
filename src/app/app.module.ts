import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Http, HttpModule} from '@angular/http';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeStorage } from '@ionic-native/native-storage';
import { Facebook } from "@ionic-native/facebook";
import { MyApp } from './app.component';
import { CustomCalendarComponent } from '../components/custom-calendar/custom-calendar';

import { PersonalInfoPage } from '../pages/personalInfo/personalInfo';
import { MainDashboardPage } from '../pages/mainDashboard/mainDashboard';
import { CalendarModule } from '../components/ion2-calendar';
import { MockStructuresProvider } from '../providers/mock-structures/mock-structures';
import { IonicPageModule } from 'ionic-angular';
import { SearchProvider } from '../providers/search/search';
import { GeoLocationServicesProvider } from '../providers/geo-location-services/geo-location-services';
import { GeoDataManagerProvider } from '../providers/geo-data-manager/geo-data-manager';
import { ParseBackendProvider } from '../providers/parse-backend/parse-backend';
import { LocalDbProvider } from '../providers/local-db/local-db';
import { ErrorHandlerProvider } from '../providers/error-handler/error-handler';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';

let config = { swipeBackEnabled:false };

@NgModule({
  declarations: [
    MyApp,
    PersonalInfoPage,
    MainDashboardPage,
    CustomCalendarComponent,
  ],
  imports: [
    BrowserModule,HttpModule,CalendarModule,
    IonicModule.forRoot(MyApp, config),
    IonicPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PersonalInfoPage,
    MainDashboardPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Camera,
    NativeStorage,
    Geolocation,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MockStructuresProvider,
    SearchProvider,
    GeoLocationServicesProvider,
    GeoDataManagerProvider,
    ParseBackendProvider,
    LocalDbProvider,
    ErrorHandlerProvider,
    ConnectivityProvider,
    ConnectivityProvider,
  ]
})
export class AppModule {}
