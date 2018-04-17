import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetallesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalles',
  templateUrl: 'detalles.html',
})
export class DetallesPage {

  cant_bed_single: any;
  cant_bed_double: any;
  detalles = {comment: "", cant_bed_single: 1, cant_bed_double: 1};
  static detail;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    DetallesPage.detail = this.detalles;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallesPage');
  }
  addSingle(){

    this.detalles.cant_bed_single = this.detalles.cant_bed_single+1;

  }
  removeSingle(){

    this.detalles.cant_bed_single = this.detalles.cant_bed_single-1;
    if(this.detalles.cant_bed_single < 0)
      this.detalles.cant_bed_single = 0;

  }
  addDouble(){

    this.detalles.cant_bed_double = this.detalles.cant_bed_double+1;

  }
  removeDouble(){

    this.detalles.cant_bed_double = this.detalles.cant_bed_double-1;
    if(this.detalles.cant_bed_double < 0)
      this.detalles.cant_bed_double = 0;
  }
}
