import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { AlertController, Platform, ToastController, ActionSheetController, Events } from 'ionic-angular';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { File, FileEntry } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-update-profile-picture',
  templateUrl: 'update-profile-picture.html',
})
export class UpdateProfilePicturePage {
  private loading: Loading;
  public myPhoto: any;
  public myPhotoURL: any;
  public error: string;
  private profilePictureUri: string;
  private name;
  private base_uri;
  private userEmail;
  private userId;
  private sideMenuImage: HTMLImageElement;
  public nameShow;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController,
  public toastCtrl: ToastController, public alertCtrl: AlertController,public loadingCtrl: LoadingController,
  public file: File, public camera: Camera, public http: Http, public nativeStorage: NativeStorage, public events: Events) {
    this.myPhoto = "";
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
          },
          error => console.error(error)
        ); 
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
  openActionSheet(){
    let actionsheet = this.actionSheetCtrl.create({
      title:"Choose",
      buttons:[{
          text: 'Camera',
          handler: () => {
            console.log("select camera option");
          this.takePhoto();
        }
      },{
        text: 'Gallery',
        handler:()=>{ 
          this.selectPhoto();
        }
      }, {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
         }
       }
     ]  
    });
    actionsheet.present();
  }

  //Using Camera
  takePhoto() {
    this.loading = this.loadingCtrl.create({
        content: 'Selecting Image...'
      });
      this.loading.present();
    this.camera.getPicture({
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.myPhoto = imageData;
      this.loading.dismiss();
    }, error => {
      this.loading.dismiss();
      this.error = JSON.stringify(error);
    });
  }

  //Using Gallery Images
  selectPhoto(): void {
    this.loading = this.loadingCtrl.create({
        content: 'Selecting Image...'
      });
      this.loading.present();
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 50,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
    }).then(imageData => {
      this.myPhoto = imageData;
      this.loading.dismiss();
    }, error => {
      this.loading.dismiss();
      this.error = JSON.stringify(error);
    });
  }

  private uploadPhoto(imageFileUri: any) {
    return new Promise((resolve, reject) => {
      this.error = null;
      this.loading = this.loadingCtrl.create({
        content: 'Uploading New Picture...'
      });
      this.loading.present();
      this.file.resolveLocalFilesystemUrl(imageFileUri).then((entry) => {
          (<FileEntry>entry).file((file) => {
            console.log(file);
            this.readFile(file).then(()=>{
              console.log("uploadPhoto resolve");
              resolve();
            }).catch((error)=>{
              console.log("uploadPhoto reject");
              reject(error)
            });
          });
        }).catch((err) => {
          console.log("uploadPhoto reject");
          console.log(err)
          reject(err);
        });
    });
      
  }

 private readFile(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.error("on loaded reading in file");
        const formData = new FormData();
        const imgBlob = new Blob([reader.result], {type: file.type});
        formData.append('file', imgBlob, file.name);
        this.postData(formData).then(()=>{
          //success 
          console.error("success reading in file");
          resolve();
        }).catch(()=>{
          console.error("error reading in file");
          reject("Error reading in file");
        });
      };
      reader.readAsArrayBuffer(file);
    });
      
  }

  //Posting the data and image
  private postData(formData: FormData) {
    return new Promise((resolve, reject) => {
      this.http.post(this.base_uri+'uploadImage', formData)
      .subscribe(data => {
            if(data.status == 200){
              if(JSON.parse(data.text()).profilePictureUri) {
                this.profilePictureUri = this.base_uri+JSON.parse(data.text()).profilePictureUri;
                let uploadData = new URLSearchParams();
                let headers = new Headers();
                headers.append('Content-Type', 'application/x-www-form-urlencoded');
                uploadData.append('userId', this.userId);
                uploadData.append('profilePcitureUri', this.profilePictureUri);
                this.http
                  .post(this.base_uri+'updateProfilePicture', uploadData, {headers: headers})
                    .subscribe(data => {
                      if(data.status == 200){
                        this.loading.dismiss();
                        this.nativeStorage.setItem('user', {
                          name: this.name,
                          profilePictureUri: this.profilePictureUri,
                          email: this.userEmail,
                        }).then(() => {
                          this.events.publish("syncUserInfo");
                          console.log('User Stored to Native Storage'),
                          resolve();
                        }).catch((error)=>{
                          console.error('Error storing user', error);
                          this.showAlertMessage("Error!", "Cannot Process Request.", ['Ok']);
                          reject();
                        });
                      }else{
                        reject();
                      }
                    }, error => {
                      this.loading.dismiss();
                      this.showAlertMessage("Error!", "Cannot Process Request.", ['Ok']);
                        console.log(error.json());
                        reject();
                    });
              }
              else {
                this.loading.dismiss();
                this.showAlertMessage("Error!", "There was an error while uploading the picture.", ['Ok']);
                reject();
              }
            }      
          }, error => {
            this.loading.dismiss();
            this.showAlertMessage("Error!", "Cannot Process Request.", ['Ok']);
            console.log(error.json());
            reject();
          });
    });
      
  }

  goToMainDashboard():void{
    this.navCtrl.push('DashboardPage')
  }

  showAlertMessage(title: string, subTitle: string, buttons: [string]): void {
    let alert = this.alertCtrl.create({
          title: title,
          subTitle: subTitle,
          buttons: buttons
        });
        alert.present();
  }
  private showToast(ok: boolean) {
    if (ok) {
      const toast = this.toastCtrl.create({
        message: 'Upload successful',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else {
      const toast = this.toastCtrl.create({
        message: 'Upload failed',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }

  updateProfilePicture(){
    if(this.myPhoto){
      this.uploadPhoto(this.myPhoto).then(()=>{
        this.loading.dismiss();
        this.goToMainDashboard();
      }).catch((error)=>{
        this.loading.dismiss();
        this.showAlertMessage("Error!", error , ['Ok']);
      });
    }
    else {
      this.loading.dismiss();
      this.showAlertMessage("Error!", "No Picture Selected to Upload.", ['Ok']);
    }
  }
}
