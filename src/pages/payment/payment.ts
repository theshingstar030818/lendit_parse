import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  @Input() data: any;
  public bankName;
  public accountNumber;
  public routingNumber;
  private base_uri: string;
  private userEmail: string;
  private profilePictureUri: string;
  private name;
  private userId: string;
  private loading: any;
  private sideMenuImage: HTMLImageElement;
  public nameShow;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public nativeStorage: NativeStorage,
  public alertCtrl: AlertController,public http: Http, private loadingCtrl: LoadingController, public events: Events) {
    this.bankName= "";
    this.accountNumber= "";
    this.routingNumber= "";

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
          this.getPaymentInformation();
          },
          error => console.error(error)
        );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
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

  savePaymentInfo(): void{
        let Data = new URLSearchParams();
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        Data.append('userId', this.userId);
        Data.append('bankName', this.bankName);
        Data.append('accountNumber', this.accountNumber);
        Data.append('routingNumber', this.routingNumber);

        this.http
          .post(this.base_uri+'updatePaymentInformation', Data, {headers: headers})
            .subscribe(data => {
              if(data.status == 200){
                this.showAlertMessage("Success!", "Payment Information Saved.", ['Ok']);
              }
              
            }, error => {
              this.showAlertMessage("Error!", "Cannot Save Payment Information. Try Again.", ['Ok']);
                console.log(error.json());
            });
  }

  getPaymentInformation(){
    this.loading = this.loadingCtrl.create({
      content: 'Getting Payment Data...'
    });
    this.loading.present();
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http
      .get(this.base_uri+'getPaymentInformation/'+this.userId,{headers: headers})
        .subscribe(data => {  
          this.loading.dismiss();
          this.bankName = JSON.parse(data.text()).paymentInformation[0].BankName;
          this.accountNumber = JSON.parse(data.text()).paymentInformation[0].AccountNumber;
          this.routingNumber = JSON.parse(data.text()).paymentInformation[0].RoutingNumber;
        }, error => {
          this.loading.dismiss();
          this.showAlertMessage("Error!", "Cannot get payment information.", ['Ok']);
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
