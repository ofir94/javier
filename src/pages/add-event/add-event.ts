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
 //TODO Event modificarlo para que guarde tambien el id de la reserva para si esta lleno entonces es un update, sino es un insert
  event = { startDate: HomePage.reserva.startDate,
            endDate: HomePage.reserva.endDate,
            cantKid: HomePage.reserva.cantKid,
            cantAdult: HomePage.reserva.cantAdult,
            location: HomePage.reserva.location,
            status: HomePage.reserva.status,
            price: HomePage.reserva.price,
            deposit: HomePage.reserva.deposit,
            id_client: HomePage.reserva.id_client,
            cant_bed_single: HomePage.reserva.cant_bed_single ,
            cant_bed_double: HomePage.reserva.cant_bed_double,
            comment: HomePage.reserva.comment
  };
  room = {id_room : '',name : '',cant_people: 0,cant_bed_aditional: 0,cant_bed_single: 0,cant_bed_double : 0,view_order:0}
  rooms = [];
  selectOptions;
  static style = 'falta_pago';
  static reservation;

  //Checked
  falta_pago_checked = true;
  deposito_pagado_checked = false;
  totalmente_pagado_checked = false;
  cancelado_checked = false;
  no_disponible_checked = false;
  //Checked
  static editReservation;
  //VALIDACION
  // formularioEvento:FormGroup;
  constructor(public alertCtrl: AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              private calendar: Calendar,
              private databaseProvider: DatabaseProvider
              /*private fb: FormBuilder*/)
  {

    // this.event = this.navParams.get('modelres');
    AddEventPage.reservation = this.event;
    this.selectOptions = {//para poder ponerle un evento al ok del alert para poner habitacionn1 como titulo
      mode: 'md'
    };

    alert('addevents')

    // if(AddEventPage.editReservation){
    //   this.event = HomePage.reserva;
    //
    // }
    this.databaseProvider.getDatabaseState().subscribe(rdy => {
      if(rdy){

        this.getRoomById(HomePage.reserva.location);
        this.getAllRooms();
      }
    });
    // this.getAllRooms();
    // this.buildForm();

    this.event.status;
    this.ininicializarEstado();

  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  pintar_nav(style,value){
    $("#navbar_evento").attr('class','toolbar toolbar-md');
    $("#navbar_evento").addClass('toolbar-md-'+style);
    this.event.status = value;
    AddEventPage.style = style;

  //  alert("Sltatus:"+this.event.status);
  }
  // save(){
  //   let day = this.event.startDate;
  //
  //   // this.addReservation();    //Esto es para anadirlo a la bd
  //   HomePage.pintar(this.event.startDate,this.event.endDate,this.event.status);
  //   this.navCtrl.pop();
  //
  // }

  calcularPrecio() {
    // document.getElementById("precioFinal").setAttribute("ng-reflect-model", "5");
    let start = new Date(new Date(this.event.startDate).getTime()+1*24*60*60*1000);
    let end = new Date(new Date(this.event.endDate).getTime()+1*24*60*60*1000);
    let cantNoches = end.getDate() - start.getDate();
    let precioXNoche = 30;//Aqui tengo q hacer una consulta a la bd con el id de la habitacion pa saber cuanto cuesta la noche
    let precioFinal = cantNoches * precioXNoche;
    this.event.price = precioFinal.toString();
  }

  //VALIDACION
  // buildForm() {
  //   this.formularioEvento = this.fb.group({
  //     precio:['',[Validators.required,Validators.maxLength(30)]],
  //
  //   });
  // }

  //BD
  getRoomById(id){

    alert('room by id '+id)

    this.databaseProvider.getRoomById(id).then(data => {
      for(let dat of data){
        this.room = dat;
        this.event.location = this.room.id_room;
      }

    });
  }
  //BD

  // BD
  getAllRooms(){
    alert('get all rooms')
    this.databaseProvider.getAllRooms().then(data => {
      this.rooms = data;
    });
  }
  //BD

  // ESTATICO
  // getAllRooms(){
  //   let room1 =  {id: '1', name:'room1'}
  //   let room2 =  {id: '2', name:'room2'};
  //   this.rooms = [room1,room2];
  //
  // }
  // ESTATICO


  ininicializarEstado(){
    if(this.event.status == "1"){
      this.falta_pago_checked = true;
      this.deposito_pagado_checked= false;
      this.totalmente_pagado_checked = false;
      this.cancelado_checked = false;
      this.no_disponible_checked = false;


      this.pintar_nav('falta_pago',this.event.status);

    }
    if(this.event.status == "2"){
      this.falta_pago_checked = false;
      this.deposito_pagado_checked= true;
      this.totalmente_pagado_checked = false;
      this.cancelado_checked = false;
      this.no_disponible_checked = false;



      this.pintar_nav('deposito_pagado',this.event.status);

    }
    if(this.event.status == "3"){
      this.falta_pago_checked = false;
      this.deposito_pagado_checked= false;
      this.totalmente_pagado_checked = true;
      this.cancelado_checked = false;
      this.no_disponible_checked = false;
      this.pintar_nav('secondary',this.event.status);

    }
    if(this.event.status == "4"){
      this.falta_pago_checked = false;
      this.deposito_pagado_checked= false;
      this.totalmente_pagado_checked = false;
      this.cancelado_checked = true;
      this.no_disponible_checked = false;
      this.pintar_nav('cancelado',this.event.status);

    }
    if(this.event.status == "5"){
      this.falta_pago_checked = false;
      this.deposito_pagado_checked= false;
      this.totalmente_pagado_checked = false;
      this.cancelado_checked = false;
      this.no_disponible_checked = true;
      this.pintar_nav('danger',this.event.status);

    }

  }
}
