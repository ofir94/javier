import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
// import {DatabaseProvider} from "../../providers/database/database";
/**
 * Generated class for the AddEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
  developers = [];
  developer = {};

  event = { title: "", location: "", message: "", startDate: "", endDate: "" };

  constructor(public alertCtrl: AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              private calendar: Calendar
              /*,private databaseProvider: DatabaseProvider*/)
  {
  //   this.databaseProvider.getDatabaseState().subscribe(rdy => {
  //   if(rdy){
  //     this.loadDeveloperData();
  //   }
  // });
  }

  // loadDeveloperData(){
  //   this.databaseProvider.getAllDevelopers().then(data => {
  //     this.developers = data;
  //   });
  // }
  // addDeveloper(){
  //   this.databaseProvider.addDevelopers(this.developer['name'], this.developer['skill'],this.developer['yearOfExperience'])
  //     .then(data =>{
  //       this.loadDeveloperData();
  //     });
  //   this.developer = {};
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  save() {
    this.calendar.createEvent(this.event.title, this.event.location, this.event.message, new Date(this.event.startDate), new Date(this.event.endDate)).then(
      (msg) => {
        let alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: 'Event saved successfully',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.pop();
      },
      (err) => {
        let alert = this.alertCtrl.create({
          title: 'Failed!',
          subTitle: err,
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }

}
