import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { AlertController, Platform, ToastController, ActionSheetController } from 'ionic-angular';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { File, FileEntry } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile-info',
  templateUrl: 'profileInfo.html',
})
export class ProfileInfoPage {
  @Input() data: any;
  private numberForm: FormGroup;
  private userAgree: boolean;
  private date;
  private dateTime;
  private base_uri: string;
  private verificationCode: number;
  private fullNumber;
  private contactMethod: string;
  private email: boolean;
  private text: boolean;
  private call: boolean;
  private userEmail: string;
  public myPhoto: any;
  public myPhotoURL: any;
  public error: string;
  private loading: Loading;
  public pictureUri: any;
  private profilePictureUri: string;
  private name;
  private sideMenuImage: HTMLImageElement;
  public nameShow;
  public facebookIdentifier;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public nativeStorage: NativeStorage,
  public http: Http, public toastCtrl: ToastController, public alertCtrl: AlertController,public loadingCtrl: LoadingController,
  public file: File, public camera: Camera, public actionSheetCtrl: ActionSheetController, public events: Events ) {
  
    this.contactMethod = "";
    this.myPhoto = "";
    
    // this.nativeStorage.getItem('base')
    //   .then(
    //     data => {
    //       this.base_uri = data.mainUri;
    //       },
    //       error => console.error(error)
    //     );

    // this.nativeStorage.getItem('user')
    //   .then(
    //     data => {
    //       this.userEmail = data.email;
    //       this.name = data.name;
    //       this.profilePictureUri = data.profilePcitureUri;
    //       if(this.profilePictureUri){
    //           this.myPhoto = this.profilePictureUri;
    //       }
    //       else{
    //           this.myPhoto = "";
    //       }
    //       },
    //       error => console.error(error)
    //     );


    this.numberForm = formBuilder.group({
        mobileNumber:['', Validators.compose([Validators.pattern("^[0-9]*$"), Validators.required])]
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
        this.facebookIdentifier = data.facebookIdentifier;
        if(this.profilePictureUri){
          this.myPhoto = this.profilePictureUri;
        }
        else{
          this.myPhoto = "";
        }
      },
        error => console.error(error)
      );    
  }

  openTerms(url):void {
    window.open(url, '_system', 'location=yes');
  }

  //Nex button calls this function
  nextPage(): void{
    if(!this.userAgree){
        this.showAlertMessage("Error!", "Terms and Conditions are not accepted!", ['OK']);
    }
    else if(!this.contactMethod){
        this.showAlertMessage("Error!", "Preferred method of contact must be selected.", ['OK']);
    }
    else{
      if(this.myPhoto){
        if(this.facebookIdentifier){
          this.date =  new Date();
          this.dateTime = this.date.getFullYear()+"-"+("0"+(this.date.getMonth()+1)).slice(-2)+"-"+("0"+this.date.getDate()).slice(-2)
            +" "+("0"+this.date.getHours()).slice(-2)+":"+("0"+this.date.getMinutes()).slice(-2)+":"+("0"+this.date.getSeconds()).slice(-2);
          this.fullNumber = ("1"+this.numberForm.value.mobileNumber);
          let uploadData = new URLSearchParams();
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          uploadData.append('email', this.userEmail);
          uploadData.append('contactMethod', this.contactMethod);
          uploadData.append('number', this.fullNumber);
          uploadData.append('dateUpdated', this.dateTime);
          this.http
            .post(this.base_uri+'updateUserProfile', uploadData, {headers: headers})
              .subscribe(data => {
                if(data.status == 200){
                  this.verificationCode = JSON.parse(data.text()).code;
                  this.nativeStorage.setItem('number',{
                    verificationStatus: "Unverified",  
                    phoneNumber: this.fullNumber,
                    verificationCode: this.verificationCode
                  })
                  this.goToAccountVerification();
                }
                
              }, error => {
                this.showAlertMessage("Error!", "Cannot Process Request.", ['Ok']);
                  console.log(error.json());
              });
        }
        else{
          this.uploadPhoto(this.myPhoto);
        }
      }
      else{
        this.date =  new Date();
        this.dateTime = this.date.getFullYear()+"-"+("0"+(this.date.getMonth()+1)).slice(-2)+"-"+("0"+this.date.getDate()).slice(-2)
          +" "+("0"+this.date.getHours()).slice(-2)+":"+("0"+this.date.getMinutes()).slice(-2)+":"+("0"+this.date.getSeconds()).slice(-2);
        this.fullNumber = ("1"+this.numberForm.value.mobileNumber);
        let uploadData = new URLSearchParams();
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        uploadData.append('email', this.userEmail);
        uploadData.append('contactMethod', this.contactMethod);
        uploadData.append('number', this.fullNumber);
        uploadData.append('dateUpdated', this.dateTime);
        this.http
          .post(this.base_uri+'updateUserProfile', uploadData, {headers: headers})
            .subscribe(data => {
              if(data.status == 200){
                this.verificationCode = JSON.parse(data.text()).code;
                this.nativeStorage.setItem('number',{
                  verificationStatus: "Unverified",  
                  phoneNumber: this.fullNumber,
                  verificationCode: this.verificationCode
                })
                this.goToAccountVerification();
              }
              
            }, error => {
              this.showAlertMessage("Error!", "Cannot Process Request.", ['Ok']);
                console.log(error.json());
            });
      }
    }
  }

  goToAccountVerification(){
    this.navCtrl.push('AccountVerificationPage')
  }

  showAlertMessage(title: string, subTitle: string, buttons: [string]): void {
    let alert = this.alertCtrl.create({
          title: title,
          subTitle: subTitle,
          buttons: buttons
        });
        alert.present();
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

  private uploadPhoto(imageFileUri: any): void {
    this.error = null;
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...'
    });
    this.loading.present();
    this.file.resolveLocalFilesystemUrl(imageFileUri)
      .then(entry => (<FileEntry>entry).file(file => this.readFile(file)))
      .catch(err => console.log(err));
  }

 private readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {type: file.type});
      formData.append('file', imgBlob, file.name);
      this.postData(formData);
    };
    reader.readAsArrayBuffer(file);
  }

  //Posting the data and image
  private postData(formData: FormData) {
    this.http.post(this.base_uri+'uploadImage', formData)
    .subscribe(data => {
          if(data.status == 200){
            if(JSON.parse(data.text()).profilePictureUri) {
              this.profilePictureUri = this.base_uri+JSON.parse(data.text()).profilePictureUri;
              this.date =  new Date();
              this.dateTime = this.date.getFullYear()+"-"+("0"+(this.date.getMonth()+1)).slice(-2)+"-"+("0"+this.date.getDate()).slice(-2)
                +" "+("0"+this.date.getHours()).slice(-2)+":"+("0"+this.date.getMinutes()).slice(-2)+":"+("0"+this.date.getSeconds()).slice(-2);
              this.fullNumber = ("1"+this.numberForm.value.mobileNumber);
              let uploadData = new URLSearchParams();
              let headers = new Headers();
              headers.append('Content-Type', 'application/x-www-form-urlencoded');
              uploadData.append('email', this.userEmail);
              uploadData.append('contactMethod', this.contactMethod);
              uploadData.append('number', this.fullNumber);
              uploadData.append('dateUpdated', this.dateTime);
              uploadData.append('profilePcitureUri', this.profilePictureUri);
              this.http
                .post(this.base_uri+'updateUserProfile', uploadData, {headers: headers})
                  .subscribe(data => {
                    if(data.status == 200){
                      this.verificationCode = JSON.parse(data.text()).code;
                      this.nativeStorage.setItem('number',{
                        verificationStatus: "Unverified",  
                        phoneNumber: this.fullNumber,
                        verificationCode: this.verificationCode
                      })
                      this.nativeStorage.setItem('user',{
                        name: this.name,  
                        email: this.userEmail,
                        profilePictureUri: this.profilePictureUri
                      })
                      this.loading.dismiss();
                      this.goToAccountVerification();
                    }
                    
                  }, error => {
                    this.loading.dismiss();
                    this.showAlertMessage("Error!", "Cannot Process Request.", ['Ok']);
                    console.log(error.json());
                  });
            }
            else {
              this.loading.dismiss();
              this.showAlertMessage("Error!", "There was an error while uploading the picture.", ['Ok']);
            }
            
          }
              
        }, error => {
          this.loading.dismiss();
          this.showAlertMessage("Error!", "Cannot Process Request.", ['Ok']);
          console.log(error.json());
        });
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

}
