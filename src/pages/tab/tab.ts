import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AddEventPage} from "../add-event/add-event";
import {ClientePage} from "../cliente/cliente";
import {DetallesPage} from "../detalles/detalles";
import {HomePage} from "../home/home";
import {DatabaseProvider} from "../../providers/database/database";

/**
 * Generated class for the TabPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html'
})
export class TabPage {
  reservaRoot = AddEventPage;
  clienteRoot = ClientePage;
  detallesRoot = DetallesPage;

  constructor(public navCtrl: NavController,  private databaseProvider: DatabaseProvider) {
    // this.reservation = this.navParams.data;


  }

  addClient(){
      alert('add client');

    alert(ClientePage.cliente['name']);

    this.databaseProvider.addClient(
      ClientePage.cliente['name'],
      ClientePage.cliente['address'],
      ClientePage.cliente['address2'],
      ClientePage.cliente['state'],
      ClientePage.cliente['postal_code'],
      ClientePage.cliente['country'],
      ClientePage.cliente['passport'],
      ClientePage.cliente['identification'],
      ClientePage.cliente['phone'],
      ClientePage.cliente['email'],
    );
  }


  addReservation(){

    let clientId;

    alert('entrar a la perdicion');

    this.databaseProvider.getLastClient().then(data => {

        alert(data.toString());

        for (let oneClient of data){
          clientId = oneClient.id_client;
          alert('id: '+clientId);
          alert('name: '+oneClient.name)

        }


    alert('id antes: '+clientId);

    AddEventPage.reservation['id_client'] = clientId;

    alert('id despues: '+AddEventPage.reservation['id_client']);

    this.databaseProvider.addReservation(
      AddEventPage.reservation['startDate'],
      AddEventPage.reservation['endDate'],
      AddEventPage.reservation['cantAdult'],
      AddEventPage.reservation['cantKid'],
      AddEventPage.reservation['price'],
      AddEventPage.reservation['deposit'],
      AddEventPage.reservation['comment'],
      AddEventPage.reservation['cant_bed_single'],
      AddEventPage.reservation['cant_bed_double'],
      AddEventPage.reservation['location'],
      AddEventPage.reservation['status'],
      AddEventPage.reservation['id_client']);

    });

  }


  save() {

    alert('save')
    console.log(AddEventPage.reservation);

    this.addClient();
    this.addReservation();
    // HomePage.pintar(AddEventPage.reservation.startDate, AddEventPage.reservation.endDate,AddEventPage.reservation.status);

    HomePage.pintarEvento(AddEventPage.reservation.startDate, AddEventPage.reservation.endDate,AddEventPage.reservation.status, AddEventPage.reservation.location);

    this.navCtrl.pop();
  }


}
