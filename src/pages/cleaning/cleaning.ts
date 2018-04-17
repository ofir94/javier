import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.selectOptions = {//para poder ponerle un evento al ok del alert para poner habitacionn1 como titulo
      mode: 'md'
    };

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CleaningPage');
  }

  hideAdd(){
    document.getElementById('addDays-1').style.display="none";
    document.getElementById('addWeekDays-1').style.display="none";
  }
  hideWeekDays(){
    document.getElementById('addDays-1').style.display="block";
    document.getElementById('addWeekDays-1').style.display="none";
  }
  hideAddDays(){
    document.getElementById('addDays-1').style.display="none";
    document.getElementById('addWeekDays-1').style.display="block";
  }

  hideAdd2(){
    document.getElementById('addDays-2').style.display="none";
    document.getElementById('addWeekDays-2').style.display="none";
  }
  hideWeekDays2(){
    document.getElementById('addDays-2').style.display="block";
    document.getElementById('addWeekDays-2').style.display="none";
  }
  hideAddDays2(){
    document.getElementById('addDays-2').style.display="none";
    document.getElementById('addWeekDays-2').style.display="block";
  }

  hideAdd3(){
    document.getElementById('addDays-3').style.display="none";
    document.getElementById('addWeekDays-3').style.display="none";
  }
  hideWeekDays3(){
    document.getElementById('addDays-3').style.display="block";
    document.getElementById('addWeekDays-3').style.display="none";
  }
  hideAddDays3(){
    document.getElementById('addDays-3').style.display="none";
    document.getElementById('addWeekDays-3').style.display="block";
  }

}
