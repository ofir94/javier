import {Component, ViewChild} from '@angular/core';
import {Content} from 'ionic-angular';
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

  day: any;
  date: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  weekDayNames: any;
  weekDayNamesDefault: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;

  eventList: any;
  selectedEvent: any;
  isSelected: any;

  todayToAdd: any
  lessAt: any;
  addAt:any;
  endDate: any;
  startDate: any;
  canLess: boolean;


  // persona = {
  //   name: "Javier",
  //   yearsOfExperience: 4,
  //   skill: "Awesomness"
  // };
  developers = [];
  developer = {};

  loaded:   boolean = false;
  tabIndex: number  = 0;
  cant: number;
  constructor(private alertCtrl: AlertController,
              public navCtrl: NavController,
              private calendar: Calendar,
              private databaseProvider: DatabaseProvider,


                                 ) {


    this.canLess = false;
    this.date = new Date();

    //Saber cuando tengo que añadir mas o menos
    this.todayToAdd = this.date;
    this.lessAt = new Date(this.date.getTime()+1000*60*60*24*2)
    this.startDate = new Date(this.date.getTime()-1000*60*60*24*1)
    this.addAt = new Date(this.date.getTime()+1000*60*60*24*60)


    this.monthNames = ["Enero","Febrero","Marzo", "Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    this.weekDayNames = ["Lu","Ma","Mi", "Ju","Vi","Sa","Do"];
    this.weekDayNamesDefault = ["DO","LU","MA","MI", "JU","VI","SÁ"];
    this.getDaysOfMonth();
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

  let once = true;
  //Add days at start
    for (let i = this.cant; i > 0; i--){
      let fecha = new Date();
      let f = new Date(fecha.setDate(fecha.getDate() - i));

      if(once){
        this.startDate = f;
        once = false;
      }
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

  addDaysAtStart(day){
    day = this.startDate;

    console.log(this.daysInThisMonth)

    let f;
    for (let i = 0; i < 30; i++){
        f = new Date(day.getTime()-1000*60*60*24*i)
      this.daysInThisMonth.unshift(f);
      this.weekDayNames.unshift(this.weekDayNamesDefault[f.getDay()]);
    }
    this.startDate = f;

    console.log(this.daysInThisMonth)
  }

  addDaysAtEnd(day){

    day = this.endDate;
    for (let i = 1; i < this.cant ; i++){
      let f = new Date(day.getTime()+1000*60*60*24*i) // doing it with seconds
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


  getDaysOfMonth() {
    //  alert("DayOfMonth");
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();

    this.weekDayNames = new Array();

    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();


    var firstDayThisMonth = this.date.getDate();
    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate() ;

    var daysBefore = 40;
    var daysAfter = 40;

    var k = true;
    for (var j = daysBefore; j >= 1; j--) {

      if(firstDayThisMonth-j <= 0) {

        if(firstDayThisMonth==2 && k) {
          this.daysInThisMonth.push(new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate());
          k=false;

        } if(firstDayThisMonth==1 && k) {
          this.daysInThisMonth.push(new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate()-1);
          this.daysInThisMonth.push(new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate());
          k=false;
        }
        this.weekDayNames.push(this.weekDayNamesDefault[this.date.getDay() - (j)]);

      }

      else {

        this.daysInThisMonth.push(firstDayThisMonth - (j));

        if(this.date.getDay() - (j) < 0 ){
          this.weekDayNames.push(this.weekDayNamesDefault[this.date.getDay() + 7-(j)]);

        }
        else {
          this.weekDayNames.push(this.weekDayNamesDefault[this.date.getDay() - (j)]);


        }

      }

    }

    this.daysInThisMonth.push(firstDayThisMonth);
    this.weekDayNames.push(this.weekDayNamesDefault[this.date.getDay()]);

    for (var h = 1; h <= daysAfter; h++) {

      if(firstDayThisMonth+h > lastDayThisMonth){ //Fin de mes
        this.daysInThisMonth.push(firstDayThisMonth +h-lastDayThisMonth);
          if(h+this.date.getDay()>6){ //Cuando llegue al final, iniciar desde el sabado
           this.weekDayNames.push(this.weekDayNamesDefault[this.date.getDay() -(7-h)]);

          }
          else {
            this.weekDayNames.push(this.weekDayNamesDefault[this.date.getDay() + (h)]);
          }

      }
      else {
        this.daysInThisMonth.push(firstDayThisMonth + h);

        if( this.date.getDay()+ h > 6){
        this.weekDayNames.push(this.weekDayNamesDefault[this.date.getDay()+ (h-7)]);

        }
        else{
          this.weekDayNames.push(this.weekDayNamesDefault[this.date.getDay()+ h]);

        }
      }
    }


  }



  goToLastMonth() {
    // console.log("LastMonth");

    this.date.setDate(this.date.getDate() - 5);
    this.getDaysOfMonth();
  }



  goToNextMonth() {
    this.date.setDate(this.date.getDate() + 5);
    this.getDaysOfMonth();
  }




  addEvent() {
    this.navCtrl.push(AddEventPage);
  }

  loadEventThisMonth() {
   /* this.eventList = new Array();
    var startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    var endDate = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0);
    this.calendar.listEventsInRange(startDate, endDate).then(
      (msg) => {
        msg.forEach(item => {
          this.eventList.push(item);
        });
      },
      (err) => {
        console.log(err);
      }
    );*/
  }

  checkEvent(day) {
    var hasEvent = false;
    var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 00:00:00";
    var thisDate2 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 23:59:59";
    this.eventList.forEach(event => {
      if(((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
        hasEvent = true;
      }
    });
    return hasEvent;
  }
  selectDate(day) {
    this.isSelected = false;
    this.selectedEvent = new Array();
    var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 00:00:00";
    var thisDate2 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 23:59:59";
    this.eventList.forEach(event => {
      if(((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
        this.isSelected = true;
        this.selectedEvent.push(event);
      }
    });
  }
  deleteEvent(evt) {
    // console.log(new Date(evt.startDate.replace(/\s/, 'T')));
    // console.log(new Date(evt.endDate.replace(/\s/, 'T')));
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure want to delete this event?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.calendar.deleteEvent(evt.title, evt.location, evt.notes, new Date(evt.startDate.replace(/\s/, 'T')), new Date(evt.endDate.replace(/\s/, 'T'))).then(
              (msg) => {
                console.log(msg);
                this.loadEventThisMonth();
                this.selectDate(new Date(evt.startDate.replace(/\s/, 'T')).getDate());
              },
              (err) => {
                console.log(err);
              }
            )
          }
        }
      ]
    });
    alert.present();
  }

  swipe(event) {
    if(event.direction === 2) {
        this.goToNextMonth()
    }
    if(event.direction === 4) {
        this.goToLastMonth()
    }
  }


  private getAnimationDirection(index):string {
    var currentIndex = this.tabIndex;

    this.tabIndex = index;

    switch (true){
      case (currentIndex < index):
        return('left');
      case (currentIndex > index):
        return ('right');
    }
  }

  updateDate(dayA,first,last){
 // alert('mosue');
    this.currentMonth = this.monthNames[dayA.getMonth()];
    this.currentYear = dayA.getFullYear();
    console.log(dayA.getDate());


    if(first){
        this.addDaysAtStart(dayA)

    }

   if(dayA >= this.addAt ){
     this.addAt = new Date(dayA.getTime()+1000*60*60*24*60);
     console.log(this.addAt)

     this.addDaysAtEnd(dayA)
   }

   let topLessAt = new Date(this.lessAt.getTime()+1000*60*60*24*10);


    if(dayA > this.lessAt && dayA < topLessAt){
    this.lessAt = new Date(dayA.getTime()-1000*60*60*24*25);

  //   this.addDaysAtStart(dayA)

   }

  }


  crear_evento(e,day,i){
    alert(day);
    $("#hab1-" + i).addClass('triangulo-equilatero-bottom-inicio');
    $("#hab1-" + (i+1)).addClass('cuadrado');
    $("#hab1-" + (i+2)).addClass('triangulo-equilatero-bottom-fin');

  }

  ngAfterViewInit() {
    console.log('Initialized');
    var g =  new Date();
    g.setDate(g.getDate()+2);
      let id =+g.getDate()+'-'+g.getMonth()+'-'+g.getFullYear();
      document.getElementById(id).scrollIntoView();
  }


  ngOnPageScrollStop() {
    console.log('They see me scrolling...');
  }
}


