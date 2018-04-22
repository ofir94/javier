import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {

  number_people: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.number_people = 1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }

  add(){
    this.number_people = this.number_people + 1;
  }

  remove(){

    if(this.number_people > 1){
      this.number_people = this.number_people - 1;
    }
  }

  save(){



  }

}
