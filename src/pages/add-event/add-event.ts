import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import {HomePage} from "../home/home";
import {DatabaseProvider} from "../../providers/database/database";

import * as $ from "jquery";
import {getLocaleDateFormat, Time} from "@angular/common";

// import {DatabaseProvider} from "../../providers/database/database";
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
  developers = [];
  developer = {};


  startDate;
  event = { /*title: "", message: "",*/ startDate: this.startDate, endDate: "", status: "falta_pago",  location: "", cantKid: "", cantAdult: "", price: ''};
  rooms= {location:"Habitacion 1"};
  selectOptions;
  constructor(public alertCtrl: AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              private calendar: Calendar,
              private databaseProvider: DatabaseProvider)
  {

    this.event.startDate = navParams.get('startDate');

    //Esto es para ver tuplas de la tabla reservation, para invocar la funcion loadDeveloperData, pero no hace falta en add-event
  //   this.databaseProvider.getDatabaseState().subscribe(rdy => {
  //   if(rdy){
  //     this.loadDeveloperData();
  //   }
  // });

    this.selectOptions = {//para poder ponerle un evento al ok del alert para poner habitacionn1 como titulo

      mode: 'md'
    };
    // Esto me parece q se puede borrar
    // if(navParams.data != null){
    // this.startDate = navParams.data.startDate;
    // $('#startDate').set(this.startDate);
    // }
  //Llenar rooms desde la bd
  }

  //Esto es para ver las tuplas de la tabla reservation y lo voy a probar en home
  // loadDeveloperData(){
  //   this.databaseProvider.getAllReservation().then(data => {
  //     this.developers = data;
  //   });
  // }

  addReservation(){
    // let precio = Number(this.event.price);   //Hacer esto con todos los numeros???
    this.databaseProvider.addReservation(this.event['startDate'], this.event['endDate'],this.event['cantAdult'], this.event['cantKid'], this.event['status'])

    //Esto no se hace aqui pq no cargo las tuplas de reservation en add-event,
    // cuando regrese home supongo q se resuelva con la llamada a addReservationData q hay en el constructor
    // .then(data =>{
      //   this.loadReservationData();
      // });
    // this.developer = {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }




  pintar_nav(style,value){
    $("#navbar_evento").attr('class','toolbar toolbar-md');
    $("#navbar_evento").addClass('toolbar-md-'+style);
    this.event.status=value;
  }
  save(){
    let day = this.event.startDate;
    //INICIO NUEVA FORMA DE TRATAR LAS FECHAS
    //
    //
    // let test = new Date(new Date(day).getTime()+1*24*60*60*1000);
    // alert(test.getFullYear()+"-"+test.getMonth()+"-"+test.getDate());


    //INICIO NUEVA FORMA DE TRATAR LAS FECHAS
    // alert(day);//pq pone un dia de menos cuando crea la fecha?

   this.addReservation();    //Esto es para anadirlo a la bd
    HomePage.prueba(this.event.startDate,this.event.endDate,this.event.status);
    this.navCtrl.pop();

  }
}
