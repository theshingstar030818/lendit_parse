import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Events } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-confirm-post-details',
  templateUrl: 'confirm-post-details.html',
})
export class ConfirmPostDetailsPage {
  @Input() data: any;
  private loading: Loading;
  private headers;
  public itemName;
  public itemCategory;
  public itemDescription;
  public itemSerialNumber;
  public itemCost;
  public itemLocation;
  public cancellationPolicy;
  public pickUpInstructions;
  public dropOffInstructions;
//coming from Post Item and Special Instructions
  private availableDateFrom;
  private availableDateTo;
  private hasNoEndDate;
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
  public additionalInfo;
  private itemRentalCost;
  private instantBooking;
  private pickUpAddress1;
  private chargeBy;
  private hourCost;
  private dayCost;
  private weekCost;
  private addressId:string;
  private itemPictureUri;
//for Native Storage
  private userEmail;
  private name;
  private profilePictureUri;
  private userId;
  private base_uri;
  private postItemData;
  private date;
  private dateTime;
  private sideMenuImage: HTMLImageElement;
  public nameShow;
  public dateFrom;
  public dateTo;
  public itemCostHour;
  public itemCostWeek;
  constructor(public navCtrl: NavController, public navParams: NavParams, public nativeStorage: NativeStorage,
  public http: Http, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public events: Events ) {
    this.headers = new Headers();
    this.itemPictureUri = [];
   // this.addressId = "";
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
      this.nativeStorage.getItem('postItem')
      .then(
        data => {
          console.log("postItem", data);
          this.itemName = data.itemName;
          this.itemCategory = data.itemCategory;
          this.itemDescription = data.itemDescription;
          this.itemSerialNumber = data.itemSerialNumber;
          this.itemCostHour = "$"+data.hourCost+"/hr";
          this.itemCost = "$"+data.dayCost+"/day";
          this.itemCostWeek = "$"+data.weekCost+"/wk";
          this.instantBooking = data.instantBooking;
          this.chargeBy = data.chargeBy;
          this.hourCost = data.hourCost;
          this.dayCost = data.dayCost;
          this.weekCost = data.weekCost;
          this.itemPictureUri = data.itemPictureUri;
          this.addressId = data.addressId,
          this.instantBooking = data.instantBooking;
          this.itemLocation = data.pickUpCity;
        },
        error => console.error(error)
        );
        setTimeout(500);
    this.nativeStorage.getItem('specialInstruction')
      .then(
        data => {
          this.availableDateFrom = data.availableDateFrom;
          this.hasNoEndDate = data.hasNoEndDate;
          if(this.hasNoEndDate=="1"){
            this.availableDateTo = "NA";
          }
          else{
          this.availableDateTo = data.availableDateTo;            
          }
          this.blackoutDateFrom1 = data.blackoutDateFrom1,
          this.blackoutDateTo1 = data.blackoutDateTo1,
          this.blackoutDateFrom2 = data.blackoutDateFrom2,
          this.blackoutDateTo2 = data.blackoutDateTo2,
          this.blackoutDateFrom3 = data.blackoutDateFrom3,
          this.blackoutDateTo3 = data.blackoutDateTo3
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
          this.pickUpInstructions = data.pickUpInstructions;
          this.dropOffInstructions = data.dropOffInstructions;
          this.cancellationPolicy = data.cancellationPolicy;
          this.additionalInfo = data.additionalInfo;
        },
        error => console.error(error)
        );
        setTimeout(500);
    events.subscribe('menu:opened', () => {
      this.sideMenuImage = document.getElementById("sideMenuImage") as HTMLImageElement;
      this.nameShow = document.getElementById("nameShow") as HTMLElement;
      this.nameShow = this.name;
      if(this.profilePictureUri != ""){
        this.sideMenuImage.src = this.profilePictureUri;
      }
    });
    events.subscribe('menu:closed', () => {
        // your action here
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPostDetailsPage');
  }
  //function called on Login attempt
  postItem():void{
      this.loading = this.loadingCtrl.create({
        content: 'Posting Item...'
      });
      this.loading.present();    
      this.date =  new Date();
      this.dateTime = this.date.getFullYear()+"-"+("0"+(this.date.getMonth()+1)).slice(-2)+"-"+("0"+this.date.getDate()).slice(-2)
      +" "+("0"+this.date.getHours()).slice(-2)+":"+("0"+this.date.getMinutes()).slice(-2)+":"+("0"+this.date.getSeconds()).slice(-2);  
      let data = new URLSearchParams();
      this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
      data.append('userId', this.userId);
      data.append('baseUri', this.base_uri);
      data.append('availableDateFrom', this.availableDateFrom);
      data.append('availableDateTo', this.availableDateTo);
      data.append('hasNoEndDate', this.hasNoEndDate);
      data.append('blackoutDateFrom1', this.blackoutDateFrom1);
      data.append('blackoutDateTo1', this.blackoutDateTo1);
      data.append('blackoutDateFrom2', this.blackoutDateFrom2);
      data.append('blackoutDateTo2', this.blackoutDateTo2);
      data.append('blackoutDateFrom3', this.blackoutDateFrom3);
      data.append('blackoutDateTo3', this.blackoutDateTo3);
      data.append('monFrom', this.monFrom);
      data.append('monTo', this.monTo);
      data.append('tueFrom', this.tueFrom);
      data.append('tueTo', this.tueTo);
      data.append('wedFrom', this.wedFrom);
      data.append('wedTo', this.wedTo);
      data.append('thursFrom', this.thursFrom);
      data.append('thursTo', this.thursTo);
      data.append('friFrom', this.friFrom);
      data.append('friTo', this.friTo);
      data.append('satFrom', this.satFrom);
      data.append('satTo', this.satTo);
      data.append('sunFrom', this.sunFrom);
      data.append('sunTo', this.sunTo);
      data.append('pickUpInstructions', this.pickUpInstructions);
      data.append('dropOffInstructions', this.dropOffInstructions);
      data.append('cancellationPolicy', this.cancellationPolicy);
      data.append('additionalInfo', this.additionalInfo);
      data.append('itemName', this.itemName);
      data.append('itemCategory', this.itemCategory);
      data.append('itemDescription', this.itemDescription);
      data.append('itemSerialNumber', this.itemSerialNumber);
      data.append('itemCost', this.itemCost);
      data.append('instantBooking', this.instantBooking);
      data.append('chargeBy', this.chargeBy);
      data.append('hourCost', this.hourCost);
      data.append('dayCost', this.dayCost);
      data.append('weekCost', this.weekCost);
      data.append('itemPictureUri', this.itemPictureUri);
      data.append('addressId', this.addressId),
      data.append('instantBooking', this.instantBooking);
      data.append('postDate', this.dateTime);
      JSON.parse(JSON.stringify(data || null ))
      this.http
        .post(this.base_uri+'postItem', data, {headers: this.headers})
          .subscribe(data => {
            this.loading.dismiss();
            if(data.status == 200){
                this.showAlertMessage("Success!", "Item Posted Successfully", ['OK']);
                this.navCtrl.push('DashboardPage');                  
            }else {
              this.showAlertMessage("Error!", "Cannot Post Item, Try again!", ['OK']);
            }  
          }, error => {
              this.loading.dismiss();
              this.showAlertMessage("Error!", JSON.parse(error.text()).message, ['OK']);
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