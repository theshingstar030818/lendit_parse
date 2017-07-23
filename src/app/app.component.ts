import { Component, ViewChild, Input } from '@angular/core';
import { Platform, ToastController, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage :any;
  private base_uri: any;
  private verificationStatus: string;
  private userEmail: string;
  public nameShow;
  private sideMenuImage = "assets/img/avatarProfilePictureDefault.png";
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public events: Events,
    private nativeStorage: NativeStorage, public toastCtrl: ToastController, public menu: MenuController
  ) {
    this.subscribeSideMenuEvents();
    platform.ready().then(() => {
      let lastTimeBackPress=0;
      let timePeriodToExit=2000;
      this.nativeStorage.getItem('base')
      .then(
        data => {
          console.log(data);
          this.base_uri = data.mainUri;
        },
        error => {
          console.error(error)
        }
      );
      this.nativeStorage.getItem('user')
      .then(
        data => {
          console.log(data);
          this.userEmail = data.email;
          this.nameShow = data.name;
          if(data.profilePictureUri){
            this.sideMenuImage = data.profilePictureUri;
          }
          console.log(this.userEmail);
          this.nativeStorage.getItem('number')
          .then(
            data => {
              this.verificationStatus = data.verificationStatus;
              console.log(this.verificationStatus);
              if(this.userEmail && this.verificationStatus=="Unverified"){
                this.rootPage = 'AccountVerificationPage';
              }
              else{
                this.rootPage = 'DashboardPage';
              }
            },
            error => {
              console.error(error)
              this.rootPage = 'ProfileInfoPage';
            }
          );
        },
        error => {
          console.error(error)
          this.rootPage = 'LoginPage';
        }
      );
      
      platform.registerBackButtonAction(() => {
        console.log("back....");
        if(new Date().getTime() - lastTimeBackPress < timePeriodToExit){
              platform.exitApp(); //Exit from app
        }
        else{
              let toast = this.toastCtrl.create({
                message: 'Press back again to exit App?',
                duration: 3000,
                position: 'bottom'
              });
                toast.present();     
                lastTimeBackPress=new Date().getTime();
        }
      })
      
      this.nativeStorage.setItem('base',{
        mainUri:'http://lendit.gantzerinc.co/'})
        .then(
        () => console.log('Stored item!'),
         error => console.error('Error storing item', error)
        );

      if(!this.base_uri) {
        //http://lendit.peartechinc.com/
        //http://localhost/LendItBackend/public/
        //http://192.168.0.12:80/LendItBackend/public/
        //http://lendit.gantzerinc.co/
        this.nativeStorage.setItem('base',{
        mainUri:'http://lendit.gantzerinc.co/',
      }).then(
        () => console.log('Stored item!'),
         error => console.error('Error storing item', error)
        );
      }

      statusBar.styleDefault();
      setTimeout(() => splashScreen.hide(), 500);
    });
  }

  ionViewDidLoad(){

  }

  openSettings(): void {
    this.nav.setRoot('SettingsPage');
  }

  openProfile(): void {
    this.nav.setRoot('SettingsPage');
	
  }
  openHomePage(): void {
    this.nav.setRoot('DashboardPage');
  }
  doLogout(): void {
    this.nativeStorage.remove('user');
    this.nativeStorage.remove('number');
    this.nav.setRoot('LoginPage');
  }

menuClosed() {
    this.events.publish('menu:closed', '');
}

goChangePicture():void{
    this.nav.push('UpdateProfilePicturePage');
}

openPage(page){
  this.nav.push(page);
}

  menuOpened() {
    this.nativeStorage.getItem('user')
      .then(
        data => {
          this.nameShow = data.name;
          },
          error => console.error(error)
        );
    this.events.publish('menu:opened', '');
  }

  subscribeSideMenuEvents(){
    console.log("syncUserInfo");
    this.events.subscribe("syncUserInfo", ()=>{
      this.nativeStorage.getItem('user').then(data => {
          this.userEmail = data.email;
          this.nameShow = data.name;
          if(data.profilePictureUri){
            this.sideMenuImage = data.profilePictureUri;
          }
      }).catch((error)=>{
        console.error(error);
      });
    });
  }
}