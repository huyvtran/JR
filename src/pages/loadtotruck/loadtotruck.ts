import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, ToastController, ModalController, Platform, AlertController, Content, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';

import { Service } from '../../services/service';

@IonicPage(
  {name:'LoadtotruckPage',
  segment: 'Loadtotruck'}
)

@Component({
  selector: 'page-loadtotruck',
  templateUrl: 'loadtotruck.html'
})
export class LoadtotruckPage {
  @ViewChild('focusInputT') InputT;
  @ViewChild('focusInputVType') InputVType;
  @ViewChild('focusInputLic') InputLic;
  @ViewChild('focusInputDriver') InputDriver;
  @ViewChild('focusInputSo') InputSo;
  @ViewChild('focusInputPackNo') InputPackNo;
  @ViewChild(Content) content: Content;


  oClient:any;
  oUsername:any;
  Check:any = "Header";
  loader:any;
  isenabled:boolean = false;

  //Header
  oLoadingSummaryNo:string = "";
  oStatus:string = "DATA ENTRY";
  oDate:any = new Date().toISOString();
  oViType:string = "";
  oViTypeDes:string = "";
  oLicense:string = "";
  oDriver:string = "";
  oName:string = "";

  data_save_header:any;
  data_confirm_header:any;
  data_loading:any;
  //Details
  oSalesOrder:string = "";
  oCustomer:string = "";
  oCustomer_Name:string = "";
  oPackingNo:string = "";
  oDeliveryNo:string = "";
  oLineUpd:string = "";
  data_del_detail:any;
  data_save_detail:any;
  data_details:any;
  data_upd_detail_chk:any;
  //ItemList
  data_itemList:any;
  oItemNo:string = "";
  oLineChk:string = "";
  oItemChk:string = "";

  constructor(public navCtrl: NavController, private service: Service, private loadingCtrl: LoadingController, private toastCtrl: ToastController
    , private modalCtrl: ModalController, private storage: Storage, private keyboard: Keyboard, public platform: Platform
    , private alertCtrl: AlertController) {
    this.storage.get('_user').then((res)=>{
      this.oUsername = res;
      if(this.Check == 'Header')
      {

      }
    })
    this.storage.get('oClient').then((res)=>{
      this.oClient = res;
    })
  }

  ionViewDidEnter(){
    setTimeout(()=>{
        this.keyboard.close();
        //this.InputT.setFocus();

    },0);
    setTimeout(()=>{
        this.keyboard.close();
    },100);
  }
//Start Header---------------------------------------------------------------------------------------------------------------------------------------------
  doSaveLoadingSummaryHeader(oLoadingSummaryNo, oStatus, oDeliveryDate, oVehicle, oVehicleType, oDriver , oName){
    if(oDeliveryDate == undefined || oDeliveryDate == ""){
      this.presentToast('โปรดระบุ Date', false, 'bottom');
    }else if(oVehicle == undefined || oVehicle == ""){
      this.presentToast('โปรดระบุ License', false, 'bottom');
    }else if(oVehicleType == undefined || oVehicleType == ""){
      this.presentToast('โปรดระบุ Vehicle Type', false, 'bottom');
    }else if(oDriver == undefined || oDriver == ""){
      this.presentToast('โปรดระบุ Driver', false, 'bottom');
    }else{
      if(oLoadingSummaryNo == undefined){
        oLoadingSummaryNo = "";
        console.log("show",oLoadingSummaryNo, oStatus, oDeliveryDate, oVehicle, oVehicleType, oDriver, this.oUsername, oName)
        this.service.Save_Loading_Summary_Header(oLoadingSummaryNo, oStatus, oDeliveryDate, oVehicle, oVehicleType, oDriver, this.oUsername, oName).then((res)=>{
          this.data_save_header = res;
          console.log(this.data_save_header);
          if(this.data_save_header["0"].sqlstatus == "0"){
            this.oLoadingSummaryNo = this.data_save_header["0"].loading_summary_no;
            this.Alert('Success', this.data_save_header["0"].sqlmsg);
            if(this.oLoadingSummaryNo !== ''){
              //enable the button
              this.isenabled=true;
              }else{
              //disable the button
              this.isenabled=false;
            }
          }else{
            this.Alert('Error', this.data_save_header["0"].sqlmsg);
          }
        })
      }else{
        console.log("show",oLoadingSummaryNo, oStatus, oDeliveryDate, oVehicle, oVehicleType, oDriver, this.oUsername, oName)
        this.service.Save_Loading_Summary_Header(oLoadingSummaryNo, oStatus, oDeliveryDate, oVehicle, oVehicleType, oDriver, this.oUsername,oName).then((res)=>{
          this.data_save_header = res;
          console.log(this.data_save_header);
          if(this.data_save_header["0"].sqlstatus == "0"){
            this.oLoadingSummaryNo = this.data_save_header["0"].loading_summary_no;
            this.Alert('Success', this.data_save_header["0"].sqlmsg);

            if(this.oLoadingSummaryNo !== ''){
              //enable the button
              this.isenabled=true;
              }else{
              //disable the button
              this.isenabled=false;
            }
            // this.doClearHeader();
          }else{
            this.Alert('Error', this.data_save_header["0"].sqlmsg);
          }
        })
      }
    }

  }
  doGetLoading(){
    let profileModal = this.modalCtrl.create("LoadingsummaryPage");
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          let date = String(data.create_date).substr(0,10)
          this.oLoadingSummaryNo = data.load_summary;
          this.oViType = data.vehicle_type;
          this.oDate = date;
          this.oLicense = data.vehicle;
          this.oDriver = data.driver;
          this.oName = data.agent;

          setTimeout(()=>{
              this.InputLic.setFocus();

          },200);
          if(this.oLoadingSummaryNo !== ''){
            //enable the button
            this.isenabled=true;
            }else{
            //disable the button
            this.isenabled=false;
          }
        }else{

        }
      });
  }
  doGetLoading_Enter(){
      setTimeout(()=>{
          this.InputVType.setFocus();
      },200);
      if(this.oLoadingSummaryNo !== ''){
        //enable the button
        this.isenabled=true;
        }else{
        //disable the button
        this.isenabled=false;
      }
  }
  doGetLoadingTruck(){
    let profileModal = this.modalCtrl.create("VehicletypePage");
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          this.oViType = data.param_code;
          this.oViTypeDes = data.param_desc;
          setTimeout(()=>{
              this.InputLic.setFocus();
          },200);
        }else{

        }
      });
  }
  doGetLoadingDriver(){
    let profileModal = this.modalCtrl.create("DriverPage");
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          this.oDriver = data.param_code;
          this.oName = data.param_desc;
        }else{

        }
      });
  }
  doGetLoadingTruckLicensePlate(){
    let profileModal = this.modalCtrl.create("LicensePage");
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          this.oLicense = data.param_desc;
          this.oViType =  data.remark;
          this.oViTypeDes = data.remark;
          setTimeout(()=>{
              this.InputDriver.setFocus();
          },200);
        }else{

        }
      });
  }
  doClearHeader(){
    this.oLoadingSummaryNo = "";
    this.oViType = "";
    this.oLicense = "";
    this.oDriver = "";
    this.oName = "";
    this.oViTypeDes = "";
    this.oDate = new Date().toISOString();
  }
//END Header---------------------------------------------------------------------------------------------------------------------------------------------
//Start Details---------------------------------------------------------------------------------------------------------------------------------------------
GetLoadingSalesOrderCustomerInfo(oLoadingSummaryNo, oClient){
let profileModal = this.modalCtrl.create("SaleorderPage", { oClient: oClient });
  profileModal.present();
  profileModal.onDidDismiss(data =>{
    console.log(data);
    if(data != undefined){
      this.oSalesOrder = data.sales_order;
      this.oCustomer = data.customer;
      this.oCustomer_Name = data.customer_name;
      this.oDeliveryNo =  data.delivery;
      this.doGetLoadingSummaryDetail(oLoadingSummaryNo, oClient);
    }else{

    }
  });
}
doSaveLoadingSummaryDetail(oLoadingSummaryNo, oClient, oSalesOrder, oCustomer, oPackingNo ,oDeliveryNo){
  if(oLoadingSummaryNo == undefined || oLoadingSummaryNo == ""){
    this.presentToast('โปรดระบุ Loading Summary No', false, 'bottom');
  }else if(oClient == undefined || oClient == ""){
    this.presentToast('โปรดระบุ Client', false, 'bottom');
  }else if(oSalesOrder == undefined || oSalesOrder == ""){
    this.presentToast('โปรดระบุ Sales Order', false, 'bottom');
  }else if(oCustomer == undefined || oCustomer == ""){
    this.presentToast('โปรดระบุ Customer', false, 'bottom');
  }else if(oPackingNo == undefined || oPackingNo == ""){
    this.presentToast('โปรดระบุ Packing No', false, 'bottom');
  }else if(oDeliveryNo == undefined || oDeliveryNo == ""){
    this.presentToast('โปรดระบุ Delivery No', false, 'bottom');
  }else{
    this.service.Save_Loading_Summary_Detail(oLoadingSummaryNo, oClient, oSalesOrder, oCustomer, oPackingNo, this.oUsername, oDeliveryNo).then((res)=>{
      this.data_save_detail = res;
      console.log("this.service.Save_Loading_Summary_Detail",this.data_save_detail);

      this.doGetLoadingSummaryDetail(oLoadingSummaryNo, oClient);
      this.oPackingNo = "";

      setTimeout(()=>{
          this.InputPackNo.setFocus();
      },100);
    })
  }
}
doSaveLoadingSummaryDetail_btAdd(oLoadingSummaryNo, oClient, oSalesOrder, oCustomer  ,oDeliveryNo){
  if(oLoadingSummaryNo == undefined || oLoadingSummaryNo == ""){
    this.presentToast('โปรดระบุ Loading Summary No', false, 'bottom');
  }else if(oClient == undefined || oClient == ""){
    this.presentToast('โปรดระบุ Client', false, 'bottom');
  }else if(oSalesOrder == undefined || oSalesOrder == ""){
    this.presentToast('โปรดระบุ Sales Order', false, 'bottom');
  }else if(oCustomer == undefined || oCustomer == ""){
    this.presentToast('โปรดระบุ Customer', false, 'bottom');

  }else if(oDeliveryNo == undefined || oDeliveryNo == ""){
    this.presentToast('โปรดระบุ Delivery No', false, 'bottom');
  }else{
    this.service.Save_Loading_Summary_Detail(oLoadingSummaryNo, oClient, oSalesOrder, oCustomer,'', this.oUsername, oDeliveryNo).then((res)=>{
      this.data_save_detail = res;
      console.log("this.service.Save_Loading_Summary_Detail",this.data_save_detail);

      this.doGetLoadingSummaryDetail(oLoadingSummaryNo, oClient);
      this.oPackingNo = "";

      setTimeout(()=>{
          // this.InputPackNo.setFocus();
             this.InputSo.setFocus();
      },100);
    })
  }
}
doGetLoadingSummaryDetail(oLoadingSummaryNo, oClient){
  this.service.Get_Loading_Summary_Detail(oLoadingSummaryNo, oClient).then((res)=>{
    this.data_details = res;
    console.log("this.service.Get_Loading_Summary_Detail",this.data_details);
  })
}
doReturn(packing_no, customer, customer_name, sales_order, delivery,oLoadingSummaryNo){
    console.log("doReturn",packing_no, customer, customer_name, sales_order, delivery);
  this.oPackingNo = packing_no;
  this.oCustomer = customer;
  this.oCustomer_Name = customer_name;
  this.oSalesOrder = sales_order;
  this.oDeliveryNo = delivery;

  let profileModal = this.modalCtrl.create("LoadtotruckdetailmodalPage", {"oLoadingSummaryNo": oLoadingSummaryNo, "oSalesOrder":this.oSalesOrder});
    profileModal.present();
    profileModal.onDidDismiss(data =>{
      console.log(data);
      if(data == undefined){
        this.doGetLoadingSummaryDetail(oLoadingSummaryNo, this.oClient)
      }
  });
}
doReturn_Detail_select(item_barcode,row_hh){
    console.log("doReturn_Detail_select",item_barcode,row_hh);

    this.oItemChk = item_barcode;
    this.oLineChk = row_hh;
  // this.oPackingNo = packing_no;
  // this.oCustomer = customer;
  // this.oCustomer_Name = customer_name;
  // this.oSalesOrder = sales_order;
  // this.oDeliveryNo = delivery;
}
doReturn_Detail(load_summary,item_no,sales_order, delivery,customer,row_id){
  console.log("doReturn_Detail" , load_summary,item_no,sales_order, delivery,customer,row_id);
  this.oLoadingSummaryNo = load_summary;
  this.oItemNo = item_no;
  this.oSalesOrder = sales_order;
  this.oDeliveryNo = delivery;
  this.oCustomer = customer;
  this.oLineUpd = row_id;

  this.doUpdatedingSummaryDetail_Check_Detail(this.oLoadingSummaryNo,this.oItemNo);

}
doUpdatedingSummaryDetail_Check_Detail(oLoadingSummaryNo, oItemNo){
  if(oLoadingSummaryNo == undefined || oLoadingSummaryNo == ""){
    this.presentToast('โปรดระบุ Loading Summary No', false, 'bottom');
  }else{
    this.service.Update_Loading_Summary_Detail_Check(oLoadingSummaryNo, this.oClient, "", "", oItemNo, this.oUsername , "","", "S").then((res)=>{
      this.data_upd_detail_chk = res;
      console.log("this.service.Update_Loading_Summary_Detail_Check",this.data_upd_detail_chk);
      //this.doGetLoadingSummaryDetail(oLoadingSummaryNo, oClient);
      this.doGetSummaryItemList(oLoadingSummaryNo);
      this.oPackingNo = "";
      // this.doClearDetails();
      setTimeout(()=>{
          //this.InputPackNo.setFocus();
      },100);
    })
  }
}


  doDeleteLoadingSummaryDetail(oLoadingSummaryNo, oClient, oSalesOrder, oCustomer, oPackingNo, oDeliveryNo){
    if(oLoadingSummaryNo == undefined || oLoadingSummaryNo == ""){
      this.presentToast('โปรดระบุ Loading Summary No', false, 'bottom');
    }else if(oClient == undefined || oClient == ""){
      this.presentToast('โปรดระบุ Client', false, 'bottom');
    }else if(oSalesOrder == undefined || oSalesOrder == ""){
      this.presentToast('โปรดระบุ Sales Order', false, 'bottom');
    }else if(oCustomer == undefined || oCustomer == ""){
      this.presentToast('โปรดระบุ Customer', false, 'bottom');
    }else if(oDeliveryNo == undefined || oDeliveryNo == ""){
      this.presentToast('โปรดระบุ Delivery No', false, 'bottom');
    }else{
      this.service.Delete_Loading_Summary_Detail(oLoadingSummaryNo, oClient, oSalesOrder, oCustomer, oPackingNo, this.oUsername , oDeliveryNo).then((res)=>{
        this.data_del_detail = res;
        console.log("this.service.Delete_Loading_Summary_Detail",this.data_del_detail);
        this.doGetLoadingSummaryDetail(oLoadingSummaryNo, oClient);
        this.oPackingNo = "";
        // this.doClearDetails();
        setTimeout(()=>{
            // this.InputPackNo.setFocus();
            this.InputSo.setFocus();
        },100);
      })
    }
  }
  doClearDetails(){
    this.oSalesOrder = "";
    this.oCustomer = "";
    this.oCustomer_Name = "";
    this.oPackingNo = "";
    this.oDeliveryNo = "";

    setTimeout(()=>{
        this.InputSo.setFocus();
    },100);
  }
  doConfirmLoadingSummaryDetail(oLoadingSummaryNo){
    if(oLoadingSummaryNo == undefined || oLoadingSummaryNo == ""){
      this.presentToast('โปรดระบุ Loading Summary No', false, 'bottom');
    }else{
      this.service.Confirm_Loading_Summary_Detail(oLoadingSummaryNo, this.oUsername).then((res)=>{
        this.data_confirm_header = res;
        console.log(this.data_confirm_header);
        if(this.data_confirm_header["0"].sqlstatus != "0"){
          this.Alert('Error', this.data_confirm_header["0"].sqlmsg);
        }else{
          this.Alert('Success', this.data_confirm_header["0"].sqlmsg);
        }
      })
    }
  }
  // doGetItemList(oLoadingSummaryNo,oSalesOrder){
  //   this.service.Get_Loading_Summary_Detail_Item_List(oLoadingSummaryNo, oSalesOrder).then((res)=>{
  //     this.data_itemList = res;
  //     console.log(this.data_itemList);
  //     if(this.data_itemList.length <= 0){
  //       this.Alert('Error', 'ไม่พบข้อมูล')
  //     }else{
  //
  //     }
  //   })
  // }
  doGetSummaryItemList(oLoadingSummaryNo){
    this.service.Get_Loading_Summary_Summary_Item_List(oLoadingSummaryNo).then((res)=>{
      this.data_itemList = res;
      console.log(this.data_itemList);
      if(this.data_itemList.length <= 0){
        this.Alert('Error', 'ไม่พบข้อมูล')
      }else{

      }
    })
  }
  updateScroll() {
      console.log('updating scroll')
      setTimeout(() => {
        this.content.scrollToBottom();
      }, 300)
    }

  Alert(title, subTitle){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [ {
          text: 'ตกลง',
          handler: data => {

          }
        }]
    });
    alert.present();
  }
  presentToast(key, showCloseButton, position: string) {
    const toast = this.toastCtrl.create({
      message: key,
      showCloseButton: showCloseButton,
      closeButtonText: 'Ok',
      duration: 2000,
      position : position
    });
    toast.present();
  }
  presentLoading(){
    this.loader = this.loadingCtrl.create({
      content:"Loading..."
    });
    // this.loader.present();
    this.loader.present().then(() => {});
  };
  finishLoding(){
    this.loader.dismiss();
  }
}
