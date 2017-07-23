import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController,AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-special-instructions',
  templateUrl: 'special-instructions.html',
})
export class SpecialInstructionsPage {
  @Input() data: any;
  private availableDateFrom;
  private availableDateTo;
  private hasEndDate;
  public blackoutDateFrom1;
  public blackoutDateTo1;
  public blackoutDateFrom2;
  public blackoutDateTo2;
  public blackoutDateFrom3;
  public blackoutDateTo3;
  public monFrom;
  public monTo;
  public tueFrom;
  public tueTo;
  public wedFrom;
  public wedTo;
  public thursFrom;
  public thursTo;
  public friFrom;
  public friTo;
  public satFrom;
  public satTo;
  public sunFrom;
  public sunTo;
  public pickUpInstructions;
  public dropOffInstructions;
  public cancellationPolicy;
  public additionalInfo;
  private userEmail;
  private name;
  private profilePictureUri;
  private userId;
  private itemPictureUri;
  private base_uri;
  private postItemData;
  private hasNoEndDate;
  private additionalInfoReq;
  private sideMenuImage: HTMLImageElement;
  public nameShow;

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  private modalCtrl: ModalController,
  public nativeStorage: NativeStorage,
  public events: Events,
  private alertCtrl: AlertController,  
  public toastCtrl: ToastController) {

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
  openDateAvailabilityModal(): void {
    let availabilityDateModal = this.modalCtrl.create('DateAvailabilityModalPage',{
        availableDateFrom: this.availableDateFrom,
        availableDateTo: this.availableDateTo,
        hasEndDate: this.hasEndDate
    });
      availabilityDateModal.onDidDismiss(data => {
        this.availableDateFrom = data.availableDateFrom;
        this.availableDateTo = data.availableDateTo;
        this.hasEndDate = data.hasEndDate;
        if(!this.hasEndDate){
          this.hasNoEndDate = "0";
        }
        else{
          this.hasNoEndDate = "1";
        }
        let toast = this.toastCtrl.create({
          message: 'Available Dates Saved',
          duration: 2000,
          position: 'bottom'
        });
        toast.present();
      });
    availabilityDateModal.present();
  }

  openTimeBlackoutModal(): void {
    let blackoutDateModal = this.modalCtrl.create('BlackoutDatesModalPage',{
        blackoutDateFrom1: this.blackoutDateFrom1,
        blackoutDateTo1: this.blackoutDateTo1,
        blackoutDateFrom2: this.blackoutDateFrom2,
        blackoutDateTo2: this.blackoutDateTo2,
        blackoutDateFrom3: this.blackoutDateFrom3,
        blackoutDateTo3: this.blackoutDateTo3
    });
      blackoutDateModal.onDidDismiss(data => {
        this.blackoutDateFrom1 = data.blackoutDateFrom1;
        this.blackoutDateTo1 = data.blackoutDateTo1;
        this.blackoutDateFrom2 = data.blackoutDateFrom2;
        this.blackoutDateTo2 = data.blackoutDateTo2;
        this.blackoutDateFrom3 = data.blackoutDateFrom3;
        this.blackoutDateTo3 = data.blackoutDateTo3;
        let toast = this.toastCtrl.create({
          message: 'Blackout Dates Saved',
          duration: 2000,
          position: 'bottom'
        });
        toast.present();
      });
    blackoutDateModal.present();
  }

  openTimeAvailabilityModal(): void {
    let availabilityTimeModal = this.modalCtrl.create('TimeAvailabilityModalPage',{
        monFrom: this.monFrom,
        monTo: this.monTo,
        tueFrom: this.tueFrom,
        tueTo: this.tueTo,
        wedFrom: this.wedFrom,
        wedTo: this.wedTo,
        thursFrom: this.thursFrom,
        thursTo: this.thursTo,
        friFrom: this.friFrom,
        friTo: this.friTo,
        satFrom: this.satFrom,
        satTo: this.satTo,
        sunFrom: this.sunFrom,
        sunTo: this.sunTo
    });
      availabilityTimeModal.onDidDismiss(data => {
        this.monFrom = data.monFrom;
        this.monTo = data.monTo;
        this.tueFrom = data.tueFrom;
        this.tueTo = data.tueTo;
        this.wedFrom = data.wedFrom;
        this.wedTo = data.wedTo;
        this.thursFrom = data.thursFrom;
        this.thursTo = data.thursTo;
        this.friFrom = data.friFrom;
        this.friTo = data.friTo;
        this.satFrom = data.satFrom;
        this.satTo = data.satTo;
        this.sunFrom = data.sunFrom;
        this.sunTo = data.sunTo;
        let toast = this.toastCtrl.create({
          message: 'Available Time Saved',
          duration: 2000,
          position: 'bottom'
        });
        toast.present();        
      });
    availabilityTimeModal.present();
  }

  nextPage(): void {
    if(!this.availableDateFrom){
        this.showAlertMessage("Error!", "Item Availability Date is required.", ['Ok']);      
    }
    else if(!this.cancellationPolicy){
        this.showAlertMessage("Error!", "Cancellation Policy is required.", ['Ok']);      
    }
    else{
      if(!this.additionalInfo){
        this.additionalInfoReq = "0";
      }
      else{
        this.additionalInfoReq = "1";
      }
      let specialInstruction: any = {
        availableDateFrom: this.availableDateFrom,
        availableDateTo: this.availableDateTo,
        hasNoEndDate: this.hasNoEndDate,
        blackoutDateFrom1: this.blackoutDateFrom1,
        blackoutDateTo1: this.blackoutDateTo1,
        blackoutDateFrom2: this.blackoutDateFrom2,
        blackoutDateTo2: this.blackoutDateTo2,
        blackoutDateFrom3: this.blackoutDateFrom3,
        blackoutDateTo3: this.blackoutDateTo3,
        monFrom: this.monFrom,
        monTo: this.monTo,
        tueFrom: this.tueFrom,
        tueTo: this.tueTo,
        wedFrom: this.wedFrom,
        wedTo: this.wedTo,
        thursFrom: this.thursFrom,
        thursTo: this.thursTo,
        friFrom: this.friFrom,
        friTo: this.friTo,
        satFrom: this.satFrom,
        satTo: this.satTo,
        sunFrom: this.sunFrom,
        sunTo: this.sunTo,
        pickUpInstructions: this.pickUpInstructions,
        dropOffInstructions: this.dropOffInstructions,
        cancellationPolicy: this.cancellationPolicy,
        additionalInfo: this.additionalInfoReq
      };
      this.nativeStorage.setItem('specialInstruction', specialInstruction)
        .then(
        () => console.log('User Stored to Native Storage'),
          error => console.error('Error storing user', error)
        );
        this.navCtrl.push('ConfirmPostDetailsPage');
    }
  }

  openStrictPolicyModal(): void {
    let strictPolicyModal = this.modalCtrl.create('StrictPolicyModalPage');
      strictPolicyModal.present();
  }

  openModeratePolicyModal(): void {
    let moderatePolicyModal = this.modalCtrl.create('ModeratePolicyModalPage');
      moderatePolicyModal.present();
  }

  openRelaxedPolicyModal(): void {
    let relaxedPolicyModal = this.modalCtrl.create('RelaxedPolicyModalPage');
      relaxedPolicyModal.present();
  }

  openAdditionalInfoModal(): void {
    let additionalInfoModal = this.modalCtrl.create('AdditionalInfoModalPage');
      additionalInfoModal.present();
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