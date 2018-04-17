import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import {HomePage} from "../home/home";
import {DatabaseProvider} from "../../providers/database/database";

import * as $ from "jquery";
import {getLocaleDateFormat, Time} from "@angular/common";


/**
 * Generated class for the AddEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {

  developer = {};


 startDate;
  event = { startDate: HomePage.from_date, endDate: "", cantKid: "", cantAdult: "", location: "", status: "1", price: "",deposit: ""};
  rooms= {location:"Habitación 1"};
  selectOptions;
  static reservation;
  constructor(public alertCtrl: AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              private calendar: Calendar,
              private databaseProvider: DatabaseProvider)
  {

    // this.event = this.navParams.get('modelres');
    AddEventPage.reservation = this.event;
    this.selectOptions = {//para poder ponerle un evento al ok del alert para poner habitacionn1 como titulo
      mode: 'md'
    };



    this.save = this.navParams.get('onSave');


  }


  // addReservation(){
  //   this.databaseProvider.addReservation(this.event['startDate'], this.event['endDate'],this.event['cantAdult'], this.event['cantKid'], this.event['status']);
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  pintar_nav(style,value){
    $("#navbar_evento").attr('class','toolbar toolbar-md');
    $("#navbar_evento").addClass('toolbar-md-'+style);
    this.event.status=value;
  //  alert("Sltatus:"+this.event.status);
  }
  save(){
    let day = this.event.startDate;

    // this.addReservation();    //Esto es para anadirlo a la bd
    HomePage.pintar(this.event.startDate,this.event.endDate,this.event.status);
    this.navCtrl.pop();

  }


}
