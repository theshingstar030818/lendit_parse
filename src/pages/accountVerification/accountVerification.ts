import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http, URLSearchParams, Headers } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-account-verification',
  templateUrl: 'accountVerification.html',
})
export class AccountVerificationPage {
  @Input() data: any;
  @Input() events: any;  
  private verificationCode: string;
  private phoneNumber: string;
  private userEmail: string;
  private base_uri: string;
  private verifyCode: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public nativeStorage: NativeStorage,
  public http: Http, public alertCtrl: AlertController) {
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
        },
        error => console.error(error)
      );

    this.nativeStorage.getItem('number')
     .then(
      data => {
        this.verificationCode = data.verificationCode;
        this.phoneNumber = data.phoneNumber;
        },
        error => console.error(error)
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountVerificationPage');
  }

  goBack():void{
    this.navCtrl.pop();
  }

  resendMessage():void{
    let data = new URLSearchParams();
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    data.append('email', this.userEmail);
    data.append('number', this.phoneNumber);
    this.http
    .post(this.base_uri+'resendMessage', data, {headers: headers})
        .subscribe(data => {
          if(data.status == 200){
            this.verificationCode = JSON.parse(data.text()).code;
          }
        }, error => {
          this.showAlertMessage("Error!", "Cannot Send Message.", ['Ok']);
            console.log(error.json());
        });
  }

  nextPage():void{
    if(this.verifyCode != this.verificationCode){
      this.showAlertMessage("Error!", "Invalid Code Entered.", ['Ok']);
    }
    else{
      let data = new URLSearchParams(); 
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      data.append('email', this.userEmail);
      data.append('number', this.phoneNumber);
      this.http
      .post(this.base_uri+'verifyUser', data, {headers: headers})
          .subscribe(data => {
            if(data.status == 200){
              this.nativeStorage.setItem('number',{
                verificationStatus: "Verified",
                phoneNumber: this.phoneNumber,
                verificationCode: this.verificationCode
              })
              .then(
              () => console.log('Number Stored to Native Storage'),
              error => console.error('Error storing Number', error)
              );
              this.navCtrl.push('AccountConfirmationPage');
            }
          }, error => {
            this.showAlertMessage("Error!", "Cannot Verify User at this time.", ['Ok']);
              console.log(error.json());
        });
     }
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
