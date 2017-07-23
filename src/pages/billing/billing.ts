import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-billing',
  templateUrl: 'billing.html',
})
export class BillingPage {
  @Input() data: any;
  public firstName: string;
  public lastName: string;
  public billingAddress: string;
  public billingCity: string;
  public billingState: string;
  public billingZip: string;
  public ccNumber: string;
  public ccExp: string;
  public ccCvv: string;
  private base_uri: string;
  private userEmail: string;
  private profilePictureUri: string;
  private name;
  private userId: string;
  private billingForm: FormGroup;
  private cvvForm: FormGroup;
  private loading: Loading;
  private sameAsUser;
  private nameCheck;
  private sideMenuImage: HTMLImageElement;
  public nameShow;
  public defAddress;
  public defCity;
  public defState;
  public defZip;
  public sameAsPickUp;

  constructor(public navCtrl: NavController, public navParams: NavParams, public nativeStorage: NativeStorage,
  public alertCtrl: AlertController,public http: Http, public formBuilder: FormBuilder,  public loadingCtrl: LoadingController,
  public events: Events, public toastCtrl: ToastController) {

    this.firstName= "";
    this.lastName= "";
    this.billingAddress= "";
    this.billingCity= "";
    this.billingState= "";
    this.billingZip= "";
    this.ccNumber= "";
    this.ccExp= "";
    this.ccCvv= "";
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
          this.getBillingInformation();
          },
          error => console.error(error)
        );
    this.nativeStorage.getItem('defaultAddress')
      .then(
        data => {
          this.defAddress = data.address;
          this.defCity = data.city;
          this.defState = data.state;
          this.defZip = data.zip;
          },
          error => console.error(error)
        );


    this.billingForm = formBuilder.group({
        ccNumber:['', Validators.compose([Validators.pattern("^[0-9]*$"), Validators.required])]
    });
    this.cvvForm = formBuilder.group({
        ccCvv:['', Validators.compose([Validators.pattern("^[0-9]*$"), Validators.required])]
    });

  }

  ionViewDidLoad() {
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
  updateName():void{
    if(!this.sameAsUser){
      this.firstName = "";
      this.lastName = "";
    }
    else{
      this.firstName = this.name.split(' ')[0];
      this.lastName = this.name.split(' ')[1];
    }
  }
  updateAddress():void{
    if(!this.sameAsPickUp){
      this.billingAddress = "";
      this.billingCity = "";
      this.billingState = "";
      this.billingZip = "";
    }
    else{
      if(!this.defAddress){
        let toast = this.toastCtrl.create({
          message: 'No Address found in system. Please add your address',
          duration: 2000,
          position: 'bottom'
        });
        toast.present();  
      }
      else{
        this.billingAddress = this.defAddress;
        this.billingCity = this.defCity;
        this.billingState = this.defState;
        this.billingZip = this.defZip;
      }
    }
  }
  

  getBillingInformation(){
    this.loading = this.loadingCtrl.create({
      content: 'Getting Billing Information...'
    });
    this.loading.present();
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http         
      .get(this.base_uri+'getBillingInformation/'+this.userId,{headers: headers})
        .subscribe(data => {  
          this.loading.dismiss();
          if(JSON.parse(data.text()).billingInformation[0]){
            this.firstName= JSON.parse(data.text()).billingInformation[0].BillingFirstName;
            this.lastName= JSON.parse(data.text()).billingInformation[0].BillingLastName;
            this.billingAddress= JSON.parse(data.text()).billingInformation[0].BillingAddress;
            this.billingCity= JSON.parse(data.text()).billingInformation[0].BillingCity;
            this.billingState= JSON.parse(data.text()).billingInformation[0].BillingState;
            this.billingZip= JSON.parse(data.text()).billingInformation[0].BillingZip;
            this.billingForm.controls['ccNumber'].setValue(JSON.parse(data.text()).billingInformation[0].CCNumber);
            // this.ccNumber= JSON.parse(data.text()).billingInformation[0].CCNumber;
            this.ccExp= JSON.parse(data.text()).billingInformation[0].CCExpiryDate;
            this.cvvForm.controls['ccCvv'].setValue(JSON.parse(data.text()).billingInformation[0].CCCvvNumber);
            // this.ccCvv= JSON.parse(data.text()).billingInformation[0].CCCvvNumber;
          }
        }, error => {
          this.loading.dismiss();
          this.showAlertMessage("Error!", "Cannot get billing information.", ['Ok']);
            console.log(error.json());
        });
  }

  saveBillingInfo(): void{
        let Data = new URLSearchParams();
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        Data.append('userId', this.userId);
        Data.append('firstName', this.firstName);
        Data.append('lastName', this.lastName);
        Data.append('billingAddress', this.billingAddress);
        Data.append('billingCity', this.billingCity);
        Data.append('billingState', this.billingState);
        Data.append('billingZip', this.billingZip);
        Data.append('ccNumber', this.billingForm.value.ccNumber);
        Data.append('ccExp', this.ccExp);
        Data.append('ccCvv', this.cvvForm.value.ccCvv);
        this.http
          .post(this.base_uri+'updateBillingInformation', Data, {headers: headers})
            .subscribe(data => {
              if(data.status == 200){
                this.showAlertMessage("Success!", "Billing Information Saved.", ['Ok']);
              }
              
            }, error => {
              this.showAlertMessage("Error!", "Cannot Save Billing Information. Try Again.", ['Ok']);
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
