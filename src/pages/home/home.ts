import {Component, ViewChild} from '@angular/core';
import {Content, LoadingController} from 'ionic-angular';
import { NavController, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';

import { AddEventPage } from '../add-event/add-event';

import {DatabaseProvider} from "../../providers/database/database";



import { ScrollService } from 'angular2-viewport';
import * as $ from "jquery";
import {TabPage} from "../tab/tab";
import {FilterPage} from "../filter/filter";

import { DatePicker } from '@ionic-native/date-picker';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content)
  content:Content;

  date: any;
  daysInThisMonth: any;
  monthNames: string[];
  weekDayNames: any;
  weekDayNamesDefault: string[];
  currentMonth: any;
  currentYear: any;
  eventList: any;
  todayToAdd: any
  lessAt: any;
  addAt:any;
  endDate: any;
  startDate: any;
  canLess: boolean;
  dateToRepositionView: any;
  dateToReloadViewStart: any;
  dateToReloadViewEnd: any;
  reloadView: boolean;
  asd: boolean;

  developer = {};

  loaded:   boolean = false;
  cant: number;

  today: any;


  array = [];

   //Inicio para cargar lista de tuplas de tabla reservation
  static reserva =  {
    startDate: '',
    endDate: '',
    cantKid: "",
    cantAdult: "",
    location: "",
    status: "1",
    price: "",
    deposit: "",
    id_client: "",
    cant_bed_single: 0 ,
    cant_bed_double: 0,
    comment: ""
  };
  reservas;
  estados: any;
  //Fin para cargar lista de tuplas de tabla reservation


  //Inicio para cargar lista de tuplas de tabla client
  static client = {id_client: "",name: "",address: "",address2: "",state: "",postal_code: "",country: "",passport: "",identification: "",phone: "",email: "" };

  //Inicio para cargar lista de tuplas de tabla client

  rooms: any;

  constructor(private alertCtrl: AlertController,
              public navCtrl: NavController,
              private databaseProvider: DatabaseProvider,
              public loadingCtrl: LoadingController,
              private datePicker: DatePicker,
                                 ) {

    var options = {
      date: new Date(),
      mode: 'date'
    };


    this.canLess = false;
    this.asd = true;
    this.date = new Date();
    this.today =this.date.getDate()+'-'+this.date.getMonth()+'-'+this.date.getFullYear();
    //Saber cuando tengo que añadir mas o menos
    this.todayToAdd = this.date;
    this.lessAt = new Date(this.date.getTime()+1000*60*60*24*2);
    this.startDate = new Date(this.date.getTime()-1000*60*60*24*1);
    this.addAt = new Date(this.date.getTime()+1000*60*60*24*60);
    this.reloadView = false;

    this.monthNames = ["Enero","Febrero","Marzo", "Abril","Mayo","Junio","Julio","Agos.","Sept","Octu.","Novie.","Dicie."];
    this.weekDayNames = ["Lu","Ma","Mi", "Ju","Vi","Sa","Do"];
    this.weekDayNamesDefault = ["DO","LU","MA","MI", "JU","VI","SÁ"];

    this.eventList = new Array();


    this.databaseProvider.getDatabaseState().subscribe(rdy => {
      if(rdy){

        this.getAllRooms();
        this.loadReservationData();
      }
    });


  this.daysInThisMonth = new Array();
  this.weekDayNames = new Array();

  this.cant = 75;

    this.dateToReloadViewStart =  new Date(this.date.getTime()-1000*60*60*24*70);
    this.dateToReloadViewEnd =  new Date(this.date.getTime()+1000*60*60*24*70);

  //Add days at start
    for (let i = this.cant; i > 0; i--){
      let fecha = new Date();
      let f = new Date(fecha.setDate(fecha.getDate() - i));
      this.daysInThisMonth.push(f);
      this.weekDayNames.push(this.weekDayNamesDefault[f.getDay()]);
    }
    //Add days at end
    for (let i = 0; i < this.cant ; i++){
      let fecha = new Date();
      let f = new Date(fecha.setDate(fecha.getDate() + i));
      this.endDate = f;
      this.daysInThisMonth.push(f);
      this.weekDayNames.push(this.weekDayNamesDefault[f.getDay()]);
    }

    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear =  this.date.getFullYear();

  }
 /// END CONSTRUCTOR

   // BD
  loadReservationData(){
   this.databaseProvider.getAllReservation().then(data => {
      this.reservas = data;
      for(let reserva of this.reservas){
        this.initPaint(reserva.from_date,reserva.to_date, reserva.status,reserva.id_room);
      }
    });
  }
  // BD

// BD
  getClientById(id){
   this.databaseProvider.getClientById(id).then(data => {
      HomePage.client.id_client = data.id_client;
      HomePage.client.name = data.name;
      HomePage.client.address = data.address;
      HomePage.client.address2 = data.address2;
      HomePage.client.state = data.state;
      HomePage.client.postal_code = data.postal_code;
      HomePage.client.country = data.country;
      HomePage.client.passport = data.passport;
      HomePage.client.identification = data.identification;
      HomePage.client.phone = data.phone;
      HomePage.client.email = data.email;


    });
  }
  // BD
// ESTATICO
  // getClientById(id){
  //   for(let cliente of this.clients){
  //     if(cliente.id_client == id){
  //       HomePage.client.id_client = cliente.id_client;
  //       HomePage.client.name = cliente.name;
  //       HomePage.client.address = cliente.address;
  //       HomePage.client.address2 = cliente.address2;
  //       HomePage.client.state = cliente.state;
  //       HomePage.client.postal_code = cliente.postal_code;
  //       HomePage.client.country = cliente.country;
  //       HomePage.client.passport = cliente.passport;
  //       HomePage.client.identification = cliente.identification;
  //       HomePage.client.phone = cliente.phone;
  //       HomePage.client.email = cliente.email;
  //     }
  //   }
  //
  //
  // }
  // ESTATICO


  // ESTATICO
  // loadReservationData(){
  //
  //     this.reservas = [
  //       {startDate: '2018-04-21', endDate: '2018-04-24', cantKid: "2", cantAdult: "2", id_room: "1", status: "1", price: "50",deposit: "0", id_client: "1",cant_bed_single: 2 , cant_bed_double: 2,comment:"Ese tipo me cae mal"},
  //       {startDate: '2018-04-25', endDate: '2018-04-26', cantKid: "1", cantAdult: "2", id_room: "1", status: "2", price: "20",deposit: "0", id_client: "2",cant_bed_single: 3 , cant_bed_double: 3,comment:"Ese tipo me cae bien" }
  //     ];
  //     for(let reserva of this.reservas){
  //       console.log(reserva);
  //       this.initPaint(reserva.startDate,reserva.endDate, reserva.status,reserva.id_room);
  //     }
  //
  // }
  // ESTATICO

  loadStatusData(){
    this.databaseProvider.getAllStatus().then(data => {
      this.estados = data;
    });
  }



  addAtStart(){

   let firstDate = this.daysInThisMonth[0];
   firstDate =  new Date(firstDate.getTime()-1000*60*60*24*60)
    this.daysInThisMonth = new Array();
    this.weekDayNames = new Array();

    for (let i = 1; i < 240 ; i++){
      let fecha = firstDate;
      let f = new Date(fecha.getTime() + 1000*60*60*24*i);
      this.daysInThisMonth.push(f);
      this.weekDayNames.push(this.weekDayNamesDefault[f.getDay()]);
    }
    this.dateToReloadViewStart =  new Date(this.daysInThisMonth[0].getTime()+1000*60*60*24*20);
    this.dateToReloadViewEnd =  new Date(this.daysInThisMonth[this.daysInThisMonth.length-1].getTime()-1000*60*60*24*20);

    console.log(this.dateToReloadViewStart)

  }
  addAtEnd(){

    let calc = 1000*60*60*24;
   let lastDate = this.daysInThisMonth[this.daysInThisMonth.length-1];
       lastDate =  new Date(lastDate.getTime()-calc*60);
    this.daysInThisMonth = new Array();
    this.weekDayNames = new Array();

    for (let i = 1; i < 240 ; i++){
      let fecha = lastDate;
      let f = new Date(fecha.getTime() + calc*i);
      this.daysInThisMonth.push(f);
      this.weekDayNames.push(this.weekDayNamesDefault[f.getDay()]);
    }
    this.dateToReloadViewEnd =  new Date(this.daysInThisMonth[this.daysInThisMonth.length-1].getTime()-calc*20);
    this.dateToReloadViewStart =  new Date(this.daysInThisMonth[0].getTime()+calc*20);
    console.log(this.dateToReloadViewEnd)

  }

  addmore(day){
    this.currentMonth = this.monthNames[day.getMonth()];
    this.currentYear = day.getFullYear();
    console.log(day)
    /*   console.log(day.getMonth())*/

    if(day <= this.dateToReloadViewStart && !this.reloadView){
    //  this.presentLoadingDefault();
      this.asd = false;
      this.addAtStart();
      this.dateToRepositionView =new Date(day.getTime()+1000*60*60*24*2);
      this.reloadView = true;
      this.loadReservationData()
    }

    if(day >= this.dateToReloadViewEnd && !this.reloadView){
    //  this.presentLoadingDefault();
      this.asd = false;
      this.dateToRepositionView =new Date(day.getTime()+1000*60*60*24*2);
      this.addAtEnd();
      this.reloadView = true;
      this.loadReservationData()
    }
  }

  crear_evento(day, id_room){

    // if( $("#hab1-" + day)){
    //
    // }
    if(id_room == ''){
      id_room = this.rooms[0].id_room;
    }
    let fecha_id = day.getFullYear()+"-"+day.getMonth()+"-"+day.getDate();
    let idRoom = '#hab'+id_room;
    let reservado = $(idRoom +'-'+fecha_id).attr('reservado');
    let inicio = $(idRoom +'-'+fecha_id).attr('inicio');
    let fin = $(idRoom +'-'+fecha_id).attr('fin');
    let fecha = $(idRoom +'-'+fecha_id).attr('fecha');
    // alert(idRoom +'-'+fecha_id);
    if(reservado == 'reservado') {
      if(inicio == "inicio" && fin == "fin"){
        alert("que reservacion desea ver");


      }
     // HomePage.reserva =  {startDate: '', endDate: '', cantKid: "", cantAdult: "", location: "", status: "1", price: "",deposit: ""};

      // alert(this.reservas[0].startDate);
      for(let reservacion of this.reservas){
        let bool = this.dateBetweenInitAndEnd(day,reservacion.startDate,reservacion.endDate);
        if(bool){
          HomePage.reserva.startDate = reservacion.startDate;
          HomePage.reserva.endDate = reservacion.endDate;
          HomePage.reserva.cantKid = reservacion.cantKid;
          HomePage.reserva.cantAdult = reservacion.cantAdult;
          HomePage.reserva.location = reservacion.id_room;
          HomePage.reserva.status = reservacion.status;
          HomePage.reserva.price = reservacion.price;
          HomePage.reserva.deposit = reservacion.deposit;
          HomePage.reserva.id_client = reservacion.id_client;
          HomePage.reserva.cant_bed_single = reservacion.cant_bed_single;
          HomePage.reserva.cant_bed_double = reservacion.cant_bed_double;
          HomePage.reserva.comment = reservacion.comment;

          this.getClientById(HomePage.reserva.id_client);
        }

      }


      this.navCtrl.push(TabPage);
    }
    else{
      HomePage.reserva.startDate = this.tranformarFechaAStringStart(day);
      HomePage.reserva.endDate = this.tranformarFechaAStringEnd(day);
      HomePage.reserva.status = '1';
      HomePage.reserva.cantKid = '';
      HomePage.reserva.cantAdult = '';
      HomePage.reserva.location = '';
      HomePage.reserva.status = '';
      HomePage.reserva.price = '';
      HomePage.reserva.deposit = '';
      HomePage.reserva.id_client = '';
      HomePage.reserva.cant_bed_single = 0;
      HomePage.reserva.cant_bed_double = 0;
      HomePage.reserva.comment = '';

      this.navCtrl.push(TabPage);

    }

    // this.navCtrl.push(TabPage);



  }

    initPaint(startDate,endDate,status,id_room){//OFIR NO BORRES ESTA FUNCION!!!!
    let start = new Date(new Date(startDate).getTime()+1*24*60*60*1000);
    let end = new Date(new Date(endDate).getTime()+1*24*60*60*1000);
    let idStart = start.getFullYear()+"-"+start.getMonth()+"-"+start.getDate();
    let idEnd = end.getFullYear()+"-"+end.getMonth()+"-"+end.getDate();
    let cantDias = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));

    let idCanvas;
    let habitacion = "#hab"+id_room;
    // console.log($("#hab1-" + idStart).children('canvas').attr('idCanvas'))
    //  idCanvas = $("#hab1-" + idStart).children('canvas').attr('idCanvas');
    //  HomePage.pintarTrianguloInicio(status,idCanvas);
    for(let i = 0; i < cantDias+1;i++){

      if( i == 0 ){

        // alert(habitacion +"-"+ idStart);
        idCanvas = $(habitacion +"-"+ idStart).children('canvas').attr('id');
        $(habitacion +"-"+ idStart).attr('reservado','reservado');
        $(habitacion +"-"+ idStart).attr("id_room", id_room);
        $(habitacion +"-"+ idStart).attr('fecha',idStart);
        $(habitacion +"-"+ idStart).attr('inicio', 'inicio');

        HomePage.pintarTrianguloInicio(status,idCanvas);

      }
      if( i == cantDias){
        // alert("End Day:"+endDate);
        idCanvas = $(habitacion +"-"+ idEnd).children('canvas').attr('id');
        $(habitacion +"-"+ idEnd).attr('reservado','reservado');
        $(habitacion +"-"+ idEnd).attr("id_room", id_room);
        $(habitacion +"-"+ idEnd).attr('fecha',idEnd);
        $(habitacion +"-"+ idEnd).attr('fin', 'fin');

        HomePage.pintarTrianguloFin(status,idCanvas);
      }
      if( i != 0 && i != cantDias){

        let currentDay = new Date(new Date(startDate).getTime() + (i+1)*24*60*60*1000);//la i es para sumar los dias intermedios del evento
        let idCurrentDay =  currentDay.getFullYear()+"-"+currentDay.getMonth()+"-"+currentDay.getDate();
        idCanvas = $(habitacion +"-"+ idCurrentDay).children('canvas').attr('id');
        $(habitacion +"-"+ idCurrentDay).attr('reservado','reservado');
        $(habitacion +"-"+ idCurrentDay).attr("id_room", id_room);
        $(habitacion +"-"+ idCurrentDay).attr('fecha',idCurrentDay);
        HomePage.pintarCuadrado(status,idCanvas);

      }

    }
    AddEventPage.style = 'falta_pago';
    // alert(HomePage.reservasionCreada.startDate);
    // alert(HomePage.reservasionCreada.endDate);
  }


  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando más...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 250);
  }

  ngAfterViewInit() {
    console.log('Initialized');
    let g = new Date();
    g.setDate(g.getDate() + 2);
    let id = +g.getDate() + '-' + g.getMonth() + '-' + g.getFullYear();
    // let id1 =+g.getDate()+'-'+g.getMonth()+'-'+g.getFullYear()+'1';
    document.getElementById(id).scrollIntoView(({block: "end", behavior: "instant"}));

  }

  ngAfterViewChecked(){

    if(this.reloadView){
     // this.presentLoadingDefault();
      this.reloadView = false;
      let id =+this.dateToRepositionView.getDate()+'-'+this.dateToRepositionView.getMonth()+'-'+this.dateToRepositionView.getFullYear();
      console.log(id);
    /*  alert("id reload")
      alert(id)*/
      document.getElementById(id).scrollIntoView(({block: "end", behavior: "instant"}));
    }
  }

	dateBetweenInitAndEnd(day,from_date,to_date){
    let diaMas = 1 * 24 * 60 * 60 * 1000;

    day.setHours(0,0,0,0);
    let fecha = day.getTime();

    // alert("Dia clickeado: " + day);
    let fromDate =  new Date(from_date);
    fromDate.setHours(0,0,0,0);
    let from = fromDate.getTime() + diaMas;

    let toDate = new Date(to_date);
    toDate.setHours(0,0,0,0);
    let to = toDate.getTime() + diaMas;



    // alert(from);
    // alert("Inicio de reservacion: "+ new Date(new Date(from_date).getTime() + 1 * 24 * 60 * 60 * 1000));
    // let to = new Date(to_date).getTime() + 1 * 24 * 60 * 60 * 1000;
    // alert("Fin reservacion: " +new Date(new Date(to_date).getTime() + 1 * 24 * 60 * 60 * 1000));
    if(fecha >= from && fecha <= to){
      return true;
    }
    else{
      return false;
    }
  }
  tranformarFechaAStringStart(day){
   let fecha = new Date(new Date(day).getTime()).toISOString();
   let split = fecha.toString().split('T')[0];
   return split;
  }

  tranformarFechaAStringEnd(day) {
    let diaMas = 1 * 24 * 60 * 60 * 1000;
    let fecha = new Date(new Date(day).getTime() + diaMas).toISOString();
    let split = fecha.toString().split('T')[0];
    return split;
  }


  getAllRooms(){
    this.databaseProvider.getAllRooms().then(data => {
      this.rooms = data;
    });
  }

	static pintarEvento(startDate,endDate,status,id_room){

    alert('pintar evento')
    alert('id room: '+id_room)
    alert('startDate: '+startDate)
    alert('endDate: '+endDate)

    let start = new Date(new Date(startDate).getTime()+1*24*60*60*1000);
    let end = new Date(new Date(endDate).getTime()+1*24*60*60*1000);
    let idStart = start.getFullYear()+"-"+start.getMonth()+"-"+start.getDate();
    let idEnd = end.getFullYear()+"-"+end.getMonth()+"-"+end.getDate();
    let cantDias = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));

    let idCanvas;
    let habitacion = "#hab"+id_room;
   // console.log($("#hab1-" + idStart).children('canvas').attr('idCanvas'))
   //  idCanvas = $("#hab1-" + idStart).children('canvas').attr('idCanvas');
   //  HomePage.pintarTrianguloInicio(status,idCanvas);
    alert( $(habitacion +"-"+ idStart))
    for(let i = 0; i < cantDias+1;i++){

      if( i == 0 ){

        alert( $(habitacion +"-"+ idStart))
       // alert(habitacion + idStart);
       idCanvas = $(habitacion +"-"+ idStart).children('canvas').attr('id');
       $(habitacion +"-"+ idStart).attr('reservado','reservado');
       $(habitacion +"-"+ idStart).attr("id_room", id_room);
       $(habitacion +"-"+ idStart).attr('fecha',idStart);
       $(habitacion +"-"+ idStart).attr('inicio', 'inicio');

        HomePage.pintarTrianguloInicio(status,idCanvas);

      }
      if( i == cantDias){
        // alert("End Day:"+endDate);
       idCanvas = $(habitacion +"-"+ idEnd).children('canvas').attr('id');
        $(habitacion +"-"+ idEnd).attr('reservado','reservado');
        $(habitacion +"-"+ idEnd).attr("id_room", id_room);
        $(habitacion +"-"+ idEnd).attr('fecha',idEnd);
        $(habitacion +"-"+ idEnd).attr('fin', 'fin');

        HomePage.pintarTrianguloFin(status,idCanvas);
      }
      if( i != 0 && i != cantDias){

        let currentDay = new Date(new Date(startDate).getTime() + (i+1)*24*60*60*1000);//la i es para sumar los dias intermedios del evento
        let idCurrentDay =  currentDay.getFullYear()+"-"+currentDay.getMonth()+"-"+currentDay.getDate();
        idCanvas = $(habitacion +"-"+ idCurrentDay).children('canvas').attr('id');
        $(habitacion +"-"+ idCurrentDay).attr('reservado','reservado');
        $(habitacion +"-"+ idCurrentDay).attr("id_room", id_room);
        $(habitacion +"-"+ idCurrentDay).attr('fecha',idCurrentDay);
        HomePage.pintarCuadrado(status,idCanvas);

      }

    }
    AddEventPage.style = 'falta_pago';


    // alert(HomePage.reservasionCreada.startDate);
    // alert(HomePage.reservasionCreada.endDate);

  }

  static pintarCuadrado(status,id) {

    let color = this.color(status);

    var c1 : any = document.getElementById(id);
    var ctxs1 = c1.getContext("2d");
    ctxs1.beginPath();
    ctxs1.moveTo(0, 0);
    ctxs1.lineTo(0,145);
    ctxs1.lineTo(145,145);
    ctxs1.lineTo(300,145);
    ctxs1.lineTo(300,0);
    ctxs1.fillStyle = color;
    ctxs1.fill();
  }




  static pintarTrianguloInicio(status,id){

    let color = HomePage.color(status);
    var c3 : any = document.getElementById(id);

    var ctxs3 = c3.getContext("2d");

    ctxs3.beginPath();
    ctxs3.moveTo(20, 145);
    ctxs3.lineTo(300,145);
    ctxs3.lineTo(300,0);
    ctxs3.fillStyle = color;

    ctxs3.fill();

  }

  static pintarTrianguloFin(status,id){

    let color = this.color(status);
    var c2 : any = document.getElementById(id);

    var ctxs2 = c2.getContext("2d");

    ctxs2.beginPath();
    ctxs2.moveTo(280, 0);
    ctxs2.lineTo(0,0);
    ctxs2.lineTo(0,145);
    ctxs2.fillStyle = color;
    ctxs2.fill();


  }

  static pintarDosEventosUnDia(status,id){

    let color = this.color(status);
    var c2 : any = document.getElementById("hb2-77");

    var ctxs2 = c2.getContext("2d");

    ctxs2.beginPath();
    ctxs2.moveTo(280, 0);
    ctxs2.lineTo(0,0);
    ctxs2.lineTo(0,145);
    ctxs2.fillStyle = color;
    ctxs2.fill();

  }

  static color(status){

    let color;


    if(status == "1" ){
        color = '#ff9886';
      }
    if(status == "2"){
        color = '#c2c33e';
      }
    if(status ==  "3") {
        color = '#32db64';
      }
    if(status ==  "4") {
        color = '#84607f';
      }
    if(status ==  "5"){
        color = '#f53d3d';
      }


    return color;
  }



  showDate(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(


    selectedDate => {
     /* alert(selectedDate);
      let id =+selectedDate.getDate()+'-'+selectedDate.getMonth()+'-'+selectedDate.getFullYear();
      alert(id);*/
      /*  alert("id reload")
        alert(id)*/
    //  document.getElementById(id).scrollIntoView(({block: "end", behavior: "instant"}));
      this.changeToday(selectedDate);
     this.addmore(selectedDate)
    },
      err => alert('Error occurred while getting date: ')
  );
  }

  changeToday(day){

      this.dateToRepositionView =new Date(day.getTime());

      this.daysInThisMonth = new Array()
      this.weekDayNames = new Array();
      let calc = 1000*60*60*24;

      //Add days at start
      for (let i = this.cant; i > 0; i--){
        let f = new Date(day.getTime() - calc * i);
        this.daysInThisMonth.push(f);
        this.weekDayNames.push(this.weekDayNamesDefault[f.getDay()]);
      }
      //Add days at end
      for (let i = 0; i < this.cant ; i++){

        let f = new Date(day.getTime() + calc * i);
        this.daysInThisMonth.push(f);
        this.weekDayNames.push(this.weekDayNamesDefault[f.getDay()]);
      }

      this.dateToReloadViewStart =  new Date(day.getTime()-1000*60*60*24*70);
      this.dateToReloadViewEnd =  new Date(day.getTime()+1000*60*60*24*70);
      this.dateToReloadViewEnd.setHours()

  }


  filter(){
    this.navCtrl.push(FilterPage);
  }



}


