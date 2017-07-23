import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { emailValidator, matchingStrings } from '../../validators/validator';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'signUp.html',
})
export class SignUpPage {
  @Input() data: any;
  private date;
  private dateTime;
  private base_uri: string;
  private signupForm: FormGroup;
  private passwordForm: FormGroup;

  constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams, public nativeStorage: NativeStorage, public formBuilder: FormBuilder, 
  public alertCtrl: AlertController, public loadingCtrl: LoadingController,public http: Http,) {

    this.nativeStorage.getItem('base')
    .then(
    data => {
      this.base_uri = data.mainUri;
      },
      error => console.error(error)
    );

    this.signupForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      confirmEmail: ['', Validators.compose([Validators.required, emailValidator])],
    },{
      validator: matchingStrings('email', 'confirmEmail')} 
    );
    this.passwordForm = formBuilder.group({
      password: ['', Validators.compose([Validators.minLength(4), Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.minLength(4), Validators.required])],
    }, {
      validator: matchingStrings('password', 'confirmPassword')}
    );
 }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  //Add user info in Database
  nextPage(): void{
    this.date =  new Date();
    this.dateTime = this.date.getFullYear()+"-"+("0"+(this.date.getMonth()+1)).slice(-2)+"-"+("0"+this.date.getDate()).slice(-2)
      +" "+("0"+this.date.getHours()).slice(-2)+":"+("0"+this.date.getMinutes()).slice(-2)+":"+("0"+this.date.getSeconds()).slice(-2);
    
    let data = new URLSearchParams();
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    data.append('firstName', this.signupForm.value.firstName);
    data.append('lastName', this.signupForm.value.lastName);
    data.append('email', this.signupForm.value.email);
    data.append('password', this.passwordForm.value.password);
    data.append('dateCreated', this.dateTime);
    JSON.parse(JSON.stringify(data || null ))
    this.http
    .post(this.base_uri+'addUser', data, {headers: headers})
      .subscribe(data => {
        if(data.status == 200){
          if(JSON.parse(data.text()).infoMessage == "Email already used!") {
            this.showAlertLogin("Sorry!", "Account already exist. Please Login!");          
          }
          else if(JSON.parse(data.text()).infoMessage == "User already exists!") {
            this.showAlertLogin("Sorry!", "Email used for Facebook Login!");          
          }
          else {
            this.nativeStorage.setItem('user',{
              name: this.signupForm.value.firstName + " " + this.signupForm.value.lastName,
              email: this.signupForm.value.email,
              profilePictureUri: ""
            })
              .then(
              () => {
                console.log('User Stored to Native Storage');
                this.events.publish("syncUserInfo");
              },
              error => console.error('Error storing user', error)
              );
            this.navCtrl.push('ProfileInfoPage');
          }
        }
      }, error => {
        this.showAlertMessage("Error!", "Can not add user.", ['Ok']);
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

	showAlertLogin(title: string, subTitle: string): void {
    let alert = this.alertCtrl.create({
          title: title,
          subTitle: subTitle,
          buttons: [
            {
            text: 'Login',
            handler: () => {
              this.navCtrl.push('LoginPage');
            }
          },
          ]        
        });
        alert.present();
    }

}
