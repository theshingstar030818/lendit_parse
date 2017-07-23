import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ModalController, Platform, ToastController, ActionSheetController } from 'ionic-angular';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { File, FileEntry } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { NativeStorage } from '@ionic-native/native-storage';
import { Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-post-new-item',
  templateUrl: 'post-new-item.html',
})
export class PostNewItemPage {
  @Input() data: any;
  private base_uri: string;
  private lastImage: string = null;
  private loading: any;
  public error: string;
  private headers;
  private imagePath: Array<any>;
  private fileCount;
  private itemName;
  private itemCategory;
  private itemDescription;
  private itemSerialNumber;
  private instantBooking;
  private chargeBy;
  private hourCost;
  private dayCost;
  private weekCost;
  private formData = new FormData();
  private userEmail;
  private name;
  private profilePictureUri;
  private userId;
  private itemPictureUri;
  private pickUpAddressList;
  private pickUpAddress;
  private pickUpAddressId;
  private pickUpAddressIdCheck;
  public defaultAddress;
  public address;
  public city;
  public state;
  public zip;
  public setCost;
  public cityName;
  public instantBookingId;
  private sideMenuImage: HTMLImageElement;
  public nameShow;
  private selectForm: FormGroup;
  private pictureUri;

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  private file: File,
  private actionSheet: ActionSheetController,
  private loadingCtrl: LoadingController,
  private http: Http,
  public nativeStorage: NativeStorage,
  private alertCtrl: AlertController,
  private camera: Camera,
  private modalCtrl: ModalController,
  public events: Events,
  public formBuilder: FormBuilder,
  public toastCtrl: ToastController) {
    
    this.imagePath = [];
    this.fileCount = 0;
    this.itemName = "";
    this.itemCategory = "";
    this.itemDescription = "";
    this.itemSerialNumber = "";
    this.pickUpAddressList = "";
    this.pickUpAddress= [];
    this.headers = new Headers();
    this.pictureUri = [];

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
          this.getPickUpAddress();
          },
          error => console.error(error)
        );

    this.selectForm = formBuilder.group({
        itemCategory:['', Validators.required]
    });

  }


  ionViewDidLoad() {
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

  openActionSheet(){
    let actionsheet = this.actionSheet.create({
      title:"Choose",
      buttons:[{
          text: 'Camera',
          handler: () => {
          this.selectImageFromCamera();
        }
      },{
        text: 'Gallery',
        handler:()=>{ 
          this.selectImageFromGallery();
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

   // Method to get image from Gallery
  selectImageFromGallery(){
    this.selectPhoto();
  }
  
  // Method to get image from Camera Roll
  selectImageFromCamera(){
    this.takePhoto();
  }

  nextPage(): void {
    if(this.imagePath.length>0){
      if(!this.itemName){
        this.showAlertMessage("Error!", "Item Name is required.", ['Ok']);
      }
      else if(!this.itemCategory){
        this.showAlertMessage("Error!", "Item Category is required.", ['Ok']);
      }
      else if(!this.weekCost || !this.dayCost || !this.hourCost){
        this.showAlertMessage("Error!", "Item Cost is required.", ['Ok']);
      }
      else if(!this.pickUpAddressIdCheck){
        this.showAlertMessage("Error!", "PickUp Address is required.", ['Ok']);
      }
      else{
        for(let imgPath of this.imagePath) {
          this.uploadPhoto(imgPath);
        }
      }
    }
    else{
      // if(!this.pickUpAddressIdCheck){
        this.showAlertMessage("Error!", "Please upload Atleast 1 Item Picture.", ['Ok']);
      // }
      // else{
        // if(!this.instantBooking){
        //   this.instantBookingId = "0";
        // }else{
        //   this.instantBookingId = "1";
        // }
        // let postItemData: any = {
        //     userid: this.userId,
        //     name: this.name,
        //     baseUri: this.base_uri,
        //     itemName: this.itemName,
        //     itemCategory: this.itemCategory,
        //     itemDescription: this.itemDescription,
        //     itemSerialNumber: this.itemSerialNumber,
        //     chargeBy: this.chargeBy,
        //     hourCost: this.hourCost,
        //     dayCost: this.dayCost,
        //     weekCost: this.weekCost,
        //     itemPictureUri: this.pictureUri,
        //     addressId: this.pickUpAddressId,
        //     instantBooking: this.instantBookingId,
        //     pickUpCity: this.cityName
        //   };
        //   console.log("before setting the data ", postItemData);
        //   this.nativeStorage.setItem('postItem', postItemData)
        //     .then(
        //     () => console.log('User Stored to Native Storage'),
        //       error => console.error('Error storing user', error)
        //     );
        //   this.navCtrl.push('SpecialInstructionsPage');
        // }
    }
  }

  takePhoto() {
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...'
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
      this.loading.dismiss();
      this.imagePath.push(imageData);

    }, error => {
      this.loading.dismiss();
      this.error = JSON.stringify(error);
    });
  }

  selectPhoto(): void {
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...'
    });
    this.loading.present();
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 50,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
    }).then(imageData => {
      this.loading.dismiss();
      this.imagePath.push(imageData);
    }, error => {
      this.loading.dismiss();
      this.error = JSON.stringify(error);
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
        this.cityName = data.city;
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
              this.getPickUpAddress();
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

  private uploadPhoto(imageFileUri: any): void {
    this.error = null;
    this.file.resolveLocalFilesystemUrl(imageFileUri)
      .then(entry => (<FileEntry>entry).file(file => this.readFile(file)))
      .catch(err => console.log(err));
  }

  private readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      
      const imgBlob = new Blob([reader.result], {type: file.type});
      this.fileCount++;
      this.formData.append('file[]', imgBlob, this.fileCount);
      
      if(this.fileCount == this.imagePath.length) {
        this.postData(this.formData);
      }
      
    };
    reader.readAsArrayBuffer(file);
  }

  openCostModal(): void {
    let costModal = this.modalCtrl.create('ItemCostPage');
      costModal.onDidDismiss(data => {
        this.chargeBy = data.chargeBy;
        this.hourCost = data.hourCost;
        this.dayCost = data.dayCost;
        this.weekCost = data.weekCost;
        this.setCost = " Item Cost Set"
        let toast = this.toastCtrl.create({
          message: 'Item Cost Saved',
          duration: 2000,
          position: 'bottom'
        });
        toast.present();        
      });
      costModal.present();
  }
  
  private postData(formData: FormData) {
    let headers = new Headers();
    this.loading = this.loadingCtrl.create({
      content: 'Uploading Images...'
    });
    this.loading.present();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post(this.base_uri+'uploadPostImage', formData)
    .subscribe(data => {
          // post item Image
          this.postItem(data);
              
        }, error => {
          this.loading.dismiss();
          this.showAlertMessage("Error!", "Cannot Process Request.", ['Ok']);
            console.log(error.json());
        });
  }

  postItem(data: any) {
    this.loading.dismiss();
    if(!this.instantBooking){
      this.instantBookingId = "0";
    }else{
      this.instantBookingId = "1";
    }
    if(data.status == 200){
    this.itemPictureUri = JSON.parse(data.text()).itemImageUri;
    console.log(this.itemPictureUri);
    let postItemData: any = {
      userid: this.userId,
      name: this.name,
      baseUri: this.base_uri,
      itemName: this.itemName,
      itemCategory: this.itemCategory,
      itemDescription: this.itemDescription,
      itemSerialNumber: this.itemSerialNumber,
      chargeBy: this.chargeBy,
      hourCost: this.hourCost,
      dayCost: this.dayCost,
      weekCost: this.weekCost,
      itemPictureUri: this.itemPictureUri,
      addressId: this.pickUpAddressId,
      instantBooking: this.instantBookingId,
      pickUpCity: this.cityName
    };
    this.nativeStorage.setItem('postItem', postItemData)
      .then(
      () => console.log('Post Item Data Stored to Native Storage'),
        error => console.error('Error storing user', error)
      );
      this.navCtrl.push('SpecialInstructionsPage');
    }
    else{
      this.showAlertMessage("Error!", "There was an error while uploading the picture.", ['Ok']);
    }
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
          if(JSON.parse(data.text()).pickUpAddress.length > 0){
            this.pickUpAddress = JSON.parse(data.text()).pickUpAddress;
            this.pickUpAddressList = JSON.parse(data.text()).pickUpAddress[0].PickUpAddress + ", " + JSON.parse(data.text()).pickUpAddress[0].PickUpCity
            + ", " +JSON.parse(data.text()).pickUpAddress[0].PickUpState + ", " + JSON.parse(data.text()).pickUpAddress[0].PickUpZip;
            this.pickUpAddressId = JSON.parse(data.text()).pickUpAddress[0].PickUpAddressId;
            this.cityName = JSON.parse(data.text()).pickUpAddress[0].PickUpCity;
          }
        }, error => {
          this.loading.dismiss();
          this.showAlertMessage("Error!", "Cannot get PickUp Address information.", ['Ok']);
            console.log(error.json());
        });
  }
  // Alert message
  showAlertMessage(title: string, subTitle: string, buttons: [string]): void {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
    
  }

}
