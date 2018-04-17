import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";

import {HomePage} from "../home/home";

/**
 * Generated class for the AddRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-room',
  templateUrl: 'add-room.html',
})
export class AddRoomPage {


  rooms = {name: "", cant_people: 2, cant_bed_aditional: 0,  cant_bed_single: 2, cant_bed_double: 0, view_order: 1};
  selectOptions;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private databaseProvider: DatabaseProvider) {

    this.selectOptions = {//para poder ponerle un evento al ok del alert para poner habitacionn1 como titulo

      mode: 'md'
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRoomPage');
  }

  addSingle(){

    this.rooms.cant_bed_single = this.rooms.cant_bed_single+1;

  }
  removeSingle(){

    this.rooms.cant_bed_single = this.rooms.cant_bed_single-1;
    if(this.rooms.cant_bed_single < 0)
      this.rooms.cant_bed_single = 0;

  }
  addDouble(){

    this.rooms.cant_bed_double = this.rooms.cant_bed_double+1;

  }
  removeDouble(){

    this.rooms.cant_bed_double = this.rooms.cant_bed_double-1;
    if(this.rooms.cant_bed_double < 0)
      this.rooms.cant_bed_double = 0;
  }

  save(){

      this.databaseProvider.addRoom(this.rooms.name,this.rooms.cant_people, this.rooms.cant_bed_aditional, this.rooms.cant_bed_single, this.rooms.cant_bed_double,this.rooms.view_order);
      this.navCtrl.setRoot(HomePage);
  }

}
