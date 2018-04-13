import {Component, ViewChild} from '@angular/core';
import {Content, LoadingController} from 'ionic-angular';
import { NavController, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';

import { AddEventPage } from '../add-event/add-event';

import {DatabaseProvider} from "../../providers/database/database";



import { ScrollService } from 'angular2-viewport';
import * as $ from "jquery";




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content)
  content:Content;

  date: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
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

  // persona = {
  //   name: "Javier",
  //   yearsOfExperience: 4,
  //   skill: "Awesomness"
  // };
  developers = [];
  developer = {};

  loaded:   boolean = false;
  cant: number;


  array = [];
  sum = 1000;
  constructor(private alertCtrl: AlertController,
              public navCtrl: NavController,
              private calendar: Calendar,
              private databaseProvider: DatabaseProvider,
              public scrollService: ScrollService,
              public loadingCtrl: LoadingController
                                 ) {
    scrollService.onScroll.subscribe(e => {

        // Para una de las formas

    });

    for (let i = 0; i < this.sum; ++i) {
      this.array.push(i);
    }

    this.canLess = false;
    this.asd = true;
    this.date = new Date();

    //Saber cuando tengo que añadir mas o menos
    this.todayToAdd = this.date;
    this.lessAt = new Date(this.date.getTime()+1000*60*60*24*2);
    this.startDate = new Date(this.date.getTime()-1000*60*60*24*1);
    this.addAt = new Date(this.date.getTime()+1000*60*60*24*60);
    this.reloadView = false;

    this.monthNames = ["Enero","Febrero","Marzo", "Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    this.weekDayNames = ["Lu","Ma","Mi", "Ju","Vi","Sa","Do"];
    this.weekDayNamesDefault = ["DO","LU","MA","MI", "JU","VI","SÁ"];

    this.eventList = new Array();
    // this.developers = new Array(this.persona);


 /* this.databaseProvider.getDatabaseState().subscribe(rdy => {
      if(rdy){
        this.loadDeveloperData();
      }
    });
*/

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



  }


loadDeveloperData(){
  this.databaseProvider.getAllDevelopers().then(data => {
    this.developers = data;
  });
}
addDeveloper(){
  this.databaseProvider.addDeveloper(this.developer['name'], this.developer['skill'],this.developer['yearOfExperience'])
    .then(data =>{
      this.loadDeveloperData();
    });
  this.developer = {};
}
addDeveloperPrueba(){
  this.developers.push(this.developer);
}



  addEvent() {
    this.navCtrl.push(AddEventPage);
  }



  /*swipe(event) {
    if(event.direction === 2) {
        this.goToNextMonth()
    }
    if(event.direction === 4) {
        this.goToLastMonth()
    }
  }*/



  addAtStart(){

   let firstDate = this.daysInThisMonth[0];
   firstDate =  new Date(firstDate.getTime()-1000*60*60*24*60)
    this.daysInThisMonth = new Array();
    this.weekDayNames = new Array();

    for (let i = 1; i < 120 ; i++){
      let fecha = firstDate;
      let f = new Date(fecha.getTime() + 1000*60*60*24*i);
      this.endDate = f;
      this.daysInThisMonth.push(f);
      this.weekDayNames.push(this.weekDayNamesDefault[f.getDay()]);
    }
    this.dateToReloadViewStart =  new Date(this.daysInThisMonth[0].getTime()+1000*60*60*24*10);
    this.dateToReloadViewEnd =  new Date(this.daysInThisMonth[this.daysInThisMonth.length-1].getTime()-1000*60*60*24*10);

    console.log(this.dateToReloadViewStart)

  }
  addAtEnd(){

   let lastDate = this.daysInThisMonth[this.daysInThisMonth.length-1];
       lastDate =  new Date(lastDate.getTime()-1000*60*60*24*60);
    this.daysInThisMonth = new Array();
    this.weekDayNames = new Array();

    for (let i = 1; i < 120 ; i++){
      let fecha = lastDate;
      let f = new Date(fecha.getTime() + 1000*60*60*24*i);
      this.endDate = f;
      this.daysInThisMonth.push(f);
      this.weekDayNames.push(this.weekDayNamesDefault[f.getDay()]);
    }
    this.dateToReloadViewEnd =  new Date(this.daysInThisMonth[this.daysInThisMonth.length-1].getTime()-1000*60*60*24*10);
    this.dateToReloadViewStart =  new Date(this.daysInThisMonth[0].getTime()+1000*60*60*24*10);
    console.log(this.dateToReloadViewEnd)

  }

  addmore(day){
    this.currentMonth = this.monthNames[day.getMonth()];
    this.currentYear = day.getFullYear();
 /*   console.log(day.getDate())
    console.log(day.getMonth())*/

    if(day.getDate() < this.dateToReloadViewStart.getDate() && day.getMonth() == this.dateToReloadViewStart.getMonth() ){
      this.presentLoadingDefault();
      this.asd = false;
      this.addAtStart();
      this.dateToRepositionView =new Date(day.getTime()+1000*60*60*24*2);
      this.reloadView = true;
    }

    if(day.getDate() > this.dateToReloadViewEnd.getDate() && day.getMonth() == this.dateToReloadViewEnd.getMonth() ){
      this.presentLoadingDefault();
      this.asd = false;
      this.addAtEnd();
      this.dateToRepositionView =new Date(day.getTime()+1000*60*60*24*2);
      this.reloadView = true;
    }
  }



  crear_evento(e,day,i){
    alert(new Date(day).toISOString());
    let IOSday= new Date(day);
    // let IOSday= new Date(new Date(day).getTime() - 1*24*60*60*1000).toISOString();
    this.navCtrl.push(AddEventPage,{'startDate':'2018-03-30'});


  }
  static prueba(startDate,endDate,status){//OFIR NO BORRES ESTA FUNCION!!!!

    // let start = startDate.getFullYear()+"-"+startDate.getMonth()+"-"+startDate.getDay();
    // let end = endDate.getFullYear()+"-"+endDate.getMonth()+"-"+endDate.getDay();

    let start = new Date(new Date(startDate).getTime()+1*24*60*60*1000);
    let end = new Date(new Date(endDate).getTime()+1*24*60*60*1000);
    let idStart = start.getFullYear()+"-"+start.getMonth()+"-"+start.getDate();
    let idEnd = end.getFullYear()+"-"+end.getMonth()+"-"+end.getDate();
    let currentDay;
    let idCurrentDay;

    if( $("#hab1-" + idStart).hasClass('triangulo-equilatero-bottom-fin') ){

      $("#hab1-" + idStart).addClass('dos-reservas-inicio');

    }
    if( $("#hab1-" + idEnd).hasClass('triangulo-equilatero-bottom-inicio') ){

      $("#hab1-" + idEnd).addClass('dos-reservas-fin');

    }

    let cantDias = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));




    for(let i = 0; i < cantDias+1;i++){
      if( i == 0 && !($("#hab1-" + idStart).hasClass('triangulo-equilatero-bottom-fin')) ){
        // alert("Start Day:"+startDate);
        $("#hab1-" + idStart).addClass('triangulo-equilatero-bottom-inicio-'+status);
      }
      if( i == cantDias){
        // alert("End Day:"+endDate);
        $("#hab1-" + idEnd).addClass('triangulo-equilatero-bottom-fin-'+status);
      }
      if( i != 0 && i != cantDias){
        // alert("i:"+i);
        // let currentDay = start.getFullYear()+"-"+(end.getMonth())+"-"+(start.getDate()+i);
        currentDay = new Date(new Date(startDate).getTime() + (i+1)*24*60*60*1000);//la i es para sumar los dias intermedios del evento
        idCurrentDay =  currentDay.getFullYear()+"-"+currentDay.getMonth()+"-"+currentDay.getDate();
        // alert(currentDay);
        $("#hab1-" + idCurrentDay).addClass('cuadrado-'+status);
      }
    }

    // $("#hab1-" + start.toLocaleDateString()).addClass('triangulo-equilatero-bottom-inicio');
    // $("#hab1-" + (i+1)).addClass('cuadrado');
    // $("#hab1-" + (i+2)).addClass('triangulo-equilatero-bottom-fin');
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
    let g =  new Date();
    g.setDate(g.getDate()+2);
      let id =+g.getDate()+'-'+g.getMonth()+'-'+g.getFullYear();
     // let id1 =+g.getDate()+'-'+g.getMonth()+'-'+g.getFullYear()+'1';
      document.getElementById(id).scrollIntoView(({block: "end", behavior: "instant"}));
  //    document.getElementById(id1).scrollIntoView();
  }

  ngAfterViewChecked(){

    if(this.reloadView){
      this.reloadView = false;
      let id =+this.dateToRepositionView.getDate()+'-'+this.dateToRepositionView.getMonth()+'-'+this.dateToRepositionView.getFullYear();
    /*  alert("id reload")
      alert(id)*/
      document.getElementById(id).scrollIntoView(({block: "end", behavior: "instant"}));
    }

  }

}


