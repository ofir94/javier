import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import {HomePage} from "../home/home";


/**
 * Generated class for the CleaningPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cleaning',
  templateUrl: 'cleaning.html',
})
export class CleaningPage {
  selectOptions;
  cleaning_toallas =  {selected_option:2,fixed_day: 0, after_exit: 2, week_day: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']};
  cleaning_ropacama = {selected_option:2,fixed_day: 0, after_exit: 2, week_day: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']};
  cleaning_limpieza = {selected_option:2,fixed_day: 0, after_exit: 2, week_day: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']};

  toallas1 = false;
  toallas2 = false;
  toallas3 = false;

  ropacama1 = false;
  ropacama2 = false;
  ropacama3 = false;

  limpieza1 = false;
  limpieza2 = false;
  limpieza3 = false;

  constructor(public navCtrl: NavController, public navParams: NavParams
              , private databaseProvider: DatabaseProvider) {

    this.selectOptions = {//para poder ponerle un evento al ok del alert para poner habitacionn1 como titulo
      mode: 'md'
    };


    this.databaseProvider.getDatabaseState().subscribe(rdy => {
      if(rdy){
          this.loadCleaningData();

          if(this.cleaning_toallas.selected_option == 1)
            this.toallas1 = true;
          else if(this.cleaning_toallas.selected_option == 2)
            this.toallas2 = true;
          else
            this.toallas3 = true;

          if(this.cleaning_ropacama.selected_option == 1)
            this.ropacama1 = true;
          else if(this.cleaning_ropacama.selected_option == 2)
            this.ropacama2 = true;
          else
            this.ropacama3 = true;

          if(this.cleaning_limpieza.selected_option == 1)
            this.limpieza1 = true;
          else if(this.cleaning_limpieza.selected_option == 2)
            this.limpieza2 = true;
          else
            this.limpieza3 = true;


      }
    });



    }

    loadCleaningData(){
      this.databaseProvider.getAllCleaning().then(data => {
        let cleaning = data;
        for(let clean of cleaning){
          if(clean.id_cleaning_object == 1){
            this.cleaning_toallas =  {selected_option:clean.selected_option,fixed_day: clean.fixed_day, after_exit: clean.after, week_day: clean.week_day.split(',')};
          }
          if(clean.id_cleaning_object == 2){
            this.cleaning_ropacama =  {selected_option:clean.selected_option,fixed_day: clean.fixed_day, after_exit: clean.after, week_day: clean.week_day.split(',')};
          }
          if(clean.id_cleaning_object == 3){
            this.cleaning_limpieza =  {selected_option:clean.selected_option,fixed_day: clean.fixed_day, after_exit: clean.after, week_day: clean.week_day.split(',')};
          }
        }
      });

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CleaningPage');
  }

  addFixedDay(object){

    if(object == "toalla")
      this.cleaning_toallas.fixed_day = this.cleaning_toallas.fixed_day + 1;
   else if(object == "ropacama")
      this.cleaning_ropacama.fixed_day = this.cleaning_ropacama.fixed_day + 1;
   else if(object == "limpieza")
      this.cleaning_limpieza.fixed_day = this.cleaning_limpieza.fixed_day + 1;

  }
  removeFixedDay(object){

    if(object == "toalla"){
      if(this.cleaning_toallas.fixed_day>1)
      this.cleaning_toallas.fixed_day = this.cleaning_toallas.fixed_day - 1;
    }
   else if(object == "topacama") {
      if (this.cleaning_ropacama.fixed_day > 1)
        this.cleaning_ropacama.fixed_day = this.cleaning_ropacama.fixed_day - 1;
    }
   else if(object == "limpieza") {
        if (this.cleaning_limpieza.fixed_day > 1)
          this.cleaning_limpieza.fixed_day = this.cleaning_limpieza.fixed_day - 1;
      }
  }

  hideAdd(){
    this.cleaning_toallas.selected_option = 1;
    document.getElementById('addDays-1').style.display="none";
    document.getElementById('addWeekDays-1').style.display="none";
  }
  hideWeekDays(){
    this.cleaning_toallas.selected_option = 0;
    document.getElementById('addDays-1').style.display="block";
    document.getElementById('addWeekDays-1').style.display="none";
  }
  hideAddDays(){
    this.cleaning_toallas.selected_option = 2;
    document.getElementById('addDays-1').style.display="none";
    document.getElementById('addWeekDays-1').style.display="block";
  }

  hideAdd2(){
    this.cleaning_ropacama.selected_option= 1;
    document.getElementById('addDays-2').style.display="none";
    document.getElementById('addWeekDays-2').style.display="none";
  }
  hideWeekDays2(){
    this.cleaning_ropacama.selected_option= 0;
    document.getElementById('addDays-2').style.display="block";
    document.getElementById('addWeekDays-2').style.display="none";
  }
  hideAddDays2(){
    this.cleaning_ropacama.selected_option= 3;
    document.getElementById('addDays-2').style.display="none";
    document.getElementById('addWeekDays-2').style.display="block";
  }

  hideAdd3(){
    this.cleaning_limpieza.selected_option= 1;
    document.getElementById('addDays-3').style.display="none";
    document.getElementById('addWeekDays-3').style.display="none";
  }
  hideWeekDays3(){
    this.cleaning_limpieza.selected_option= 0;
    document.getElementById('addDays-3').style.display="block";
    document.getElementById('addWeekDays-3').style.display="none";
  }
  hideAddDays3(){
    this.cleaning_limpieza.selected_option= 2;
    document.getElementById('addDays-3').style.display="none";
    document.getElementById('addWeekDays-3').style.display="block";
  }

  save(){

    this.databaseProvider.updateCleaning(this.cleaning_toallas.selected_option,this.cleaning_toallas.fixed_day, this.cleaning_toallas.after_exit, this.cleaning_toallas.week_day.toString(), 1);
    this.databaseProvider.updateCleaning(this.cleaning_ropacama.selected_option,this.cleaning_ropacama.fixed_day, this.cleaning_ropacama.after_exit, this.cleaning_ropacama.week_day.toString(), 2);
    this.databaseProvider.updateCleaning(this.cleaning_limpieza.selected_option,this.cleaning_limpieza.fixed_day, this.cleaning_limpieza.after_exit, this.cleaning_limpieza.week_day.toString(), 3);
    this.navCtrl.setRoot(HomePage);

    //ToDo -> Cuando carga no pone chequed el que habia guardado
  }

}
