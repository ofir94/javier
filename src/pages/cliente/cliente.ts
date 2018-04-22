import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";

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

  client ={
    name: HomePage.client.name,
    address: HomePage.client.address,
    address2: HomePage.client.address2,
    postal_code: HomePage.client.postal_code,
    country: HomePage.client.country,
    state: HomePage.client.state,
    passport: HomePage.client.passport,
    identification: HomePage.client.identification,
    phone: HomePage.client.phone,
    email: HomePage.client.email
  };
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
