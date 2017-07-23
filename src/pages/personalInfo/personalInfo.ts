import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-personal-info',
  templateUrl: 'personalInfo.html',
})
export class PersonalInfoPage {
  @Input() data: any;
  public defaultAddress;
  public address: string;
  public city: string;
  public state: string;
  public zip: string;  
  private base_uri: string;
  private userEmail: string;
  private profilePictureUri: string;
  private name;
  private userId: string;
  public defaultAdd;
  private loading: any;
  private headers;
  private pickUpAddress;
  private pickUpAddressList;
  private sideMenuImage: HTMLImageElement;
  public nameShow;
  public pickUpAddressId;
  public cityName;  
  constructor(public navCtrl: NavController, public navParams: NavParams, public nativeStorage: NativeStorage,
  public alertCtrl: AlertController,public http: Http, private modalCtrl: ModalController, private loadingCtrl: LoadingController,public events: Events) {
    this.address = "";
    this.city = "";
    this.state = "";
    this.zip = "";
    this.headers = new Headers();
    this.pickUpAddress= [];

    setTimeout(500);
    this.nativeStorage.getItem('base')
      .then(
        data => {
          this.base_uri = data.mainUri;
          },
          error => console.error(error)
        );
    setTimeout(500);
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
    setTimeout(500);
    this.nativeStorage.getItem('userId')
      .then(
        data => {
          this.userId = data.userId;
          this.getPickUpAddress();          
          },
          error => console.error(error)
        );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalInfoPage');
  }
  ionViewDidEnter(){
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
  savePersonalInfo(): void{
        let Data = new URLSearchParams();
        let headers = new Headers();
        if(this.defaultAddress){
          this.defaultAdd = "1";
        }
        else{
          this.defaultAdd = "0";
        }
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        Data.append('userId', this.userId);
        Data.append('address', this.address);
        Data.append('city', this.city);
        Data.append('state', this.state);
        Data.append('zip', this.zip);
        Data.append('defaultAdd', this.defaultAdd);
        this.http
          .post(this.base_uri+'updateAddressInformation', Data, {headers: headers})
            .subscribe(data => {
              if(data.status == 200){
                this.showAlertMessage("Success!", "Personal Information Saved.", ['Ok']);
              }
              
            }, error => {
              this.showAlertMessage("Error!", "Cannot Save Payment Information. Try Again.", ['Ok']);
                console.log(error.json());
            });
  }

  getPickUpAddress(){
    this.loading = this.loadingCtrl.create({
      content: 'Getting Pick Up Address...'
    });
    this.loading.present();
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http
      .get(this.base_uri+'getDefaultPickUpAddress/'+this.userId,{headers: headers})
        .subscribe(data => {  
          this.loading.dismiss();
          if(JSON.parse(data.text()).pickUpAddress[0]){
            this.pickUpAddress = JSON.parse(data.text()).pickUpAddress;
            this.pickUpAddressList = JSON.parse(data.text()).pickUpAddress[0].PickUpAddress + ", " + JSON.parse(data.text()).pickUpAddress[0].PickUpCity
            + ", " +JSON.parse(data.text()).pickUpAddress[0].PickUpState + ", " + JSON.parse(data.text()).pickUpAddress[0].PickUpZip;
            this.pickUpAddressId = JSON.parse(data.text()).pickUpAddress[0].PickUpAddressId;
            this.cityName = JSON.parse(data.text()).pickUpAddress[0].PickUpCity;
            this.nativeStorage.setItem('defaultAddress', {
                address: JSON.parse(data.text()).pickUpAddress[0].PickUpAddress,
                city:JSON.parse(data.text()).pickUpAddress[0].PickUpCity,
                zip: JSON.parse(data.text()).pickUpAddress[0].PickUpZip,
                state:JSON.parse(data.text()).pickUpAddress[0].PickUpState,
            })
            .then(
            () => console.log('Pickup Address Stored in Native Storage'),
            error => console.error('Error storing userId', error)
            );
          }
        }, error => {
          this.loading.dismiss();
          this.showAlertMessage("Error!", "Cannot get PickUp Address information.", ['Ok']);
            console.log(error.json());
        });
  }
  
  openAddAddressModal(): void {
    let AddAddressModal = this.modalCtrl.create('PickUpAddressModalPage');
      AddAddressModal.onDidDismiss(data => {
        this.loading = this.loadingCtrl.create({
          content: 'Saving Address...'
        });
        this.loading.present();
        this.defaultAddress = data.defaultAddress;
        this.address = data.address;
        this.city = data.city;
        this.state = data.state;
        this.zip = data.zip;
        let datatoUpload = new URLSearchParams();
        this.defaultAddress = "1";
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        datatoUpload.append('userId', this.userId);        
        datatoUpload.append('defaultAddress', this.defaultAddress);
        datatoUpload.append('address', this.address);
        datatoUpload.append('city', this.city);
        datatoUpload.append('state', this.state);
        datatoUpload.append('zip', this.zip);
        JSON.parse(JSON.stringify(datatoUpload || null ))
        this.http
        .post(this.base_uri+'postNewAddress',datatoUpload, {headers: this.headers})
          .subscribe(data => {
            this.loading.dismiss();
            if(data.status == 200){
              // this.getPickUpAddress();
              this.showAlertMessage("Success!", "Address added to user database!", ['OK']);
            }else {
              this.showAlertMessage("Error!", "Cannot Save Address, Try again!", ['OK']);
            }  
          }, error => {
              this.loading.dismiss();
              this.showAlertMessage("Error!", JSON.parse(error.text()).message, ['OK']);
          });
      });
    AddAddressModal.present();
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
