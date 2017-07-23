import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, Events  } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Facebook } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @Input() data: any;
  private FB_APP_ID: number = 458308387856023;
  public userName: string;
  public password: string;
  private base_uri: string;
  private headers;
  private date;
  private dateTime;
  private name: string;
  private email;
  private profilePictureUri: string;
  private verificationStatus: string;
  private loading: Loading;
  private userId;
  private rememberUsername;
  public remUserName;

  constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams, public nativeStorage: NativeStorage,
  public http: Http, public alertCtrl: AlertController, private fb: Facebook, public loadingCtrl: LoadingController ) {

    this.userName = "";
    this.password = "";
    this.headers = new Headers();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.nativeStorage.getItem('base')
    .then(
      data => {
        this.base_uri = data.mainUri;
      },
      error => console.error(error)
      );
    
    this.nativeStorage.getItem('rememberUsername')
    .then(
      data => {
        this.remUserName = data.username;
        if(this.remUserName){
          this.userName = this.remUserName;
        }
      },
      error => console.error(error)
      );
  }

  rememberUser():void{
    if(this.rememberUsername){
      this.nativeStorage.setItem('rememberUsername', {
      username: this.userName,
      })
      .then(
      () => console.log('username Stored to Native Storage'),
      error => console.error('Error storing userId', error)
      );
    }
  }
  //function called on Login attempt
  goLogin():void{
    if(this.userName != "" && this.password != "") {
      let data = new URLSearchParams();
      this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
      data.append('userName', this.userName);
      data.append('password', this.password);
      
      JSON.parse(JSON.stringify(data || null ))
      this.loading = this.loadingCtrl.create({
        content: 'Signing In...'
      });
      this.loading.present();
      this.http
        .post(this.base_uri+'loginUser', data, {headers: this.headers})
          .subscribe(data => {
            this.loading.dismiss();
            if(data.status == 200){
              if(JSON.parse(data.text()).infoMessage == "Invalid Credentials") {
                this.showAlertMessage("Error!","Invalid Credentials", ['OK']);
              }
              else{
                this.name =  JSON.parse(data.text()).name;
                this.email =  JSON.parse(data.text()).email;
                this.userId =  JSON.parse(data.text()).userId;
                this.profilePictureUri = JSON.parse(data.text()).profilePictureUri;
                console.log(this.profilePictureUri);
                this.verificationStatus =  JSON.parse(data.text()).verificationStatus;
                console.log(this.verificationStatus);
                  if(this.verificationStatus == "0"){
                    console.log(JSON.parse(data.text()).validationStatus);
                    this.nativeStorage.setItem('user', {
                      name: this.name,
                      email: this.email,
                      userId: this.userId,
                      profilePictureUri: this.profilePictureUri,
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
                  else{
                    this.nativeStorage.setItem('user', {
                      name: this.name,
                      email: this.email,
                      profilePictureUri: this.profilePictureUri,
                    })
                    .then(
                    () => {
                      console.log('User Stored to Native Storage');
                      this.events.publish("syncUserInfo");
                    },
                    error => console.error('Error storing user', error)
                    );
                    this.nativeStorage.setItem('userId', {
                      userId: this.userId,
                    })
                    .then(
                    () => console.log('UserId Stored to Native Storage'),
                    error => console.error('Error storing userId', error)
                    );
                    this.nativeStorage.setItem('number',{
                    verificationStatus: "Verified"
                    })
                    .then(
                    () => console.log('Number Stored to Native Storage'),
                    error => console.error('Error storing Number', error)
                    );
                    this.navCtrl.push('DashboardPage');                  
                  }
              }
            }else {
              this.showAlertMessage("Error!", "Cannot Process Request, Try again!", ['OK']);
            }  
          }, error => {
              this.loading.dismiss();
              this.showAlertMessage("Error!", JSON.parse(error.text()).message, ['OK']);
          });
      }
      else {
        this.showAlertMessage("Sorry!", "Username and password fields can not be empty.", ['Ok'])
      }
  }

  //function called on Facebook Login
  facebookLogin():void{
    this.fb.login(['email','user_friends'])
    .then((res: any) => {
      let userId = res.authResponse.userID;
      let params = new Array();
      let firstName = "";
      let lastName = "";
      let data = new URLSearchParams();
      let userToAdd: any = {
        name: "",
        email: "",
        profilePictureUri: "",
        facebookIdentifier:""
      };
      this.date =  new Date();
        this.dateTime = this.date.getFullYear()+"-"+("0"+(this.date.getMonth()+1)).slice(-2)+"-"+("0"+this.date.getDate()).slice(-2)
        +" "+("0"+this.date.getHours()).slice(-2)+":"+("0"+this.date.getMinutes()).slice(-2)+":"+("0"+this.date.getSeconds()).slice(-2);
      this.fb.api("me?fields=email,name,picture", params)
      .then((user) => {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        userToAdd.name = user.name;
        firstName = userToAdd.name.split(' ')[0];
        lastName = userToAdd.name.split(' ')[1];
        userToAdd.email = user.email;
        userToAdd.profilePictureUri = user.picture;
        userToAdd.facebookIdentifier = user.id;
        data.append('firstName', firstName);
        data.append('lastName', lastName);
        data.append('email', user.email);
        data.append('facebookIdentifier', userToAdd.facebookIdentifier);
        data.append('profilePicture',user.picture);
        data.append('dateCreated', this.dateTime);
        if(userToAdd.email){
          this.loading = this.loadingCtrl.create({
            content: 'Signing In with Facebook...'
          });
          this.loading.present();
          this.storeUserInfo(data, userToAdd);
        }
        else {
          this.showAlertMessage("Oops!", "Facebook cannot find your email.", ['Ok']);
        }
      })
      .catch((e) => {
        console.log(e);
        this.showAlertMessage("Error!", "Please contact application admin.", ['Ok']);
      });
    })
    .catch(e => this.showAlertMessage("Error!", "Error logging into facebook.", ['Ok']));
  }

  storeUserInfo (data:any, nativeStorageData:any):void {
      this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
      JSON.parse(JSON.stringify(data || null ))
      this.http
        .post(this.base_uri+'addUser', data, {headers: this.headers})
          .subscribe(data => {
            if(data.status == 200){
              this.userId =  JSON.parse(data.text()).userId;
              if(JSON.parse(data.text()).infoMessage == "User Added"){
                  this.nativeStorage.setItem('user', nativeStorageData)
                  .then(
                  () => {
                    console.log('User Stored to Native Storage')
                    this.events.publish("syncUserInfo");
                  },
                  error => console.error('Error storing user', error)
                  );
                  this.nativeStorage.setItem('userId', {
                      userId: this.userId,
                  })
                  .then(
                  () => console.log('UserId Stored to Native Storage'),
                  error => console.error('Error storing userId', error)
                  );
                  this.loading.dismiss();
                  this.navCtrl.push('ProfileInfoPage');
              }
              else{
                if(JSON.parse(data.text()).infoMessage == "Email already used!") {
                  this.showAlertMessage("Error!", "Your facebook email has been used in another account. Please login", ['OK']);
                }
                else if((JSON.parse(data.text()).infoMessage == "User already exists!") && (JSON.parse(data.text()).validationStatus == "0" )){
                  this.nativeStorage.setItem('user', nativeStorageData)
                  .then(
                  () => console.log('User Stored to Native Storage'),
                  error => console.error('Error storing user', error)
                  );
                  this.nativeStorage.setItem('userId', {
                      userId: this.userId,
                  })
                  .then(
                  () => console.log('UserId Stored to Native Storage'),
                  error => console.error('Error storing userId', error)
                  );
                  this.loading.dismiss();
                  this.navCtrl.push('ProfileInfoPage');
                }
                else{
                  this.nativeStorage.setItem('user', nativeStorageData)
                  .then(
                  () => {
                    console.log('User Stored to Native Storage')
                    this.events.publish("syncUserInfo");
                  },
                  error => console.error('Error storing user', error)
                  );
                  this.nativeStorage.setItem('number',{
                  verificationStatus: "Verified"
                  })
                  .then(
                  () => console.log('Number Stored to Native Storage'),
                  error => console.error('Error storing Number', error)
                  );
                  this.nativeStorage.setItem('userId', {
                      userId: this.userId,
                  })
                  .then(
                  () => console.log('UserId Stored to Native Storage'),
                  error => console.error('Error storing userId', error)
                  );
                  this.loading.dismiss();
                  this.navCtrl.push('DashboardPage');
                } 
              }
            }    
          }, error => {
            this.loading.dismiss();
              this.showAlertMessage("Error!", "Cannot add user", ['OK']);
          });
  }

  goSignUp():void{
    this.navCtrl.push('SignUpPage');
  }

  forgotPassword(): void {
    this.showAlertMessage("Coming Soon!", "This feature will be available soon.", ['OK']);
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
