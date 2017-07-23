import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @Input() data: any;
  public firstName: string;
  public lastName: string;
  public phoneNumber: string;
  private base_uri: string;
  private userEmail: string;
  private profilePictureUri: string;
  private name;
  private fullNumber;
  private userId: string;
  private contactMethod: string;
  private email: boolean;
  private text: boolean;
  private call: boolean;
  public emailAddress: string;
  private loading: Loading;
  private sideMenuImage: HTMLImageElement;
  public nameShow;

  constructor(public navCtrl: NavController, public navParams: NavParams, public nativeStorage: NativeStorage,
  public alertCtrl: AlertController, public http: Http, public loadingCtrl: LoadingController, public events: Events) {

    this.nativeStorage.getItem('base')
      .then(
        data => {
          this.base_uri = data.mainUri;
          },
          error => console.error(error)
        );

    this.nativeStorage.getItem('user')
      .then(
        data => {
          this.userEmail = data.email;
          this.name = data.name;
          this.profilePictureUri = data.profilePictureUri;
          },
          error => console.error(error)
        );
    
    this.nativeStorage.getItem('userId')
      .then(
        data => {
          this.userId = data.userId;
          this.getProfileInformation();

          },
          error => console.error(error)
        );

    // events.subscribe('menu:opened', () => {
    //   this.sideMenuImage = document.getElementById("sideMenuImage") as HTMLImageElement;
    //   this.nameShow = document.getElementById("nameShow") as HTMLElement;
    //   this.nameShow = this.name;
    //   if(this.profilePictureUri != ""){
    //     this.sideMenuImage.src = this.profilePictureUri;
    //   }
    // });

    // events.subscribe('menu:closed', () => {
    //     // your action here
    // });

    this.contactMethod = "";
    this.phoneNumber= "";
  }


  getProfileInformation(){
    this.loading = this.loadingCtrl.create({
      content: 'Getting Profile Information...'
    });
    this.loading.present();
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http
      .get(this.base_uri+'getProfileInformation/'+this.userId,{headers: headers})
        .subscribe(data => {  
          this.loading.dismiss();
          this.firstName= JSON.parse(data.text()).firstName;
          this.lastName= JSON.parse(data.text()).lastName;
          this.contactMethod= JSON.parse(data.text()).contactMethod;
          this.phoneNumber= JSON.parse(data.text()).phoneNumber;
          this.emailAddress= JSON.parse(data.text()).email;
        }, error => {
          this.loading.dismiss();
          this.showAlertMessage("Error!", "Cannot get Profile information.", ['Ok']);
            console.log(error.json());
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  ionViewDidEnter(){
      console.log('ionViewDidEnter ProfilePage');
          this.nativeStorage.getItem('base')
      .then(
        data => {
          this.base_uri = data.mainUri;
          },
          error => console.error(error)
        );
    this.nativeStorage.getItem('user')
    .then(
      data => {
        console.log(data);
        this.userEmail = data.email;
        this.name = data.name;
        this.profilePictureUri = data.profilePictureUri;
        },
        error => console.error(error)
      );    
  }

  updateUserInformation(): void{
        let Data = new URLSearchParams();
        let headers = new Headers();
        this.fullNumber = ("1"+this.phoneNumber);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        Data.append('userId', this.userId);
        Data.append('firstName', this.firstName);
        Data.append('lastName', this.lastName);
        Data.append('preferredContact', this.contactMethod);
        Data.append('phoneNumber', this.fullNumber);
        this.http
          .post(this.base_uri+'updateUserInformation', Data, {headers: headers})
            .subscribe(data => {
              if(data.status == 200){
                this.showAlertMessage("Success!", "Profile Information Saved.", ['Ok']);
              }
              
            }, error => {
              this.showAlertMessage("Error!", "Cannot Save Profile Information. Try Again.", ['Ok']);
                console.log(error.json());
            });
  }

  showAlertMessage(title: string, subTitle: string, buttons: [string]): void {
    let alert = this.alertCtrl.create({
          title: title,
          subTitle: subTitle,
          buttons: buttons
        });
        alert.present();
  }
}
