import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cliente',
  templateUrl: 'cliente.html',
})
export class ClientePage {

  client ={name: "", address: "", address2: "", postal_code: "", country: "",state: "", passport: "", identification: "", phone: "", email: ""};
  static cliente;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    ClientePage.cliente = this.client;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientePage');
  }

  setClient(){
    this.navParams.data = this.client;
  }



}
