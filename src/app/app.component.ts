import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AddRoomPage} from "../pages/add-room/add-room";
import {CleaningPage} from "../pages/cleaning/cleaning";
import {CommentsPage} from "../pages/comments/comments";
import {ProfilePage} from "../pages/profile/profile";
import {EmailProvider} from "../providers/email/email";

import {File, IWriteOptions} from '@ionic-native/file';
import {DatabaseProvider} from "../providers/database/database";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  icons:any;
  pages2: any;
  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private _EMAIL       : EmailProvider,
              public plt: Platform,
              private file: File,
              private databaseProvider: DatabaseProvider,
              private alertCtrl: AlertController

  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation

    this.icons = ['md-bookmarks','md-home','ios-water"' ]
    this.pages = [
      { title: 'Inicio', component: HomePage},
      { title: 'Añadir Habitación', component: AddRoomPage},
      { title: 'Limpieza', component: CleaningPage}
    ];
    this.pages2 = new Array();
    this.pages2 = {
      HomePage: HomePage,
      AddRoomPage: AddRoomPage,
      CleaningPage: CleaningPage,
      CommentsPage: CommentsPage,
      ProfilePage: ProfilePage,

    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  recomendation(){

    // Retrieve the validated form fields
    let message = 	"Prueba la aplicación Guudbed de gestión de reservas de alojamiento, que uso a diario. URL";

    this._EMAIL.sendEmail('', "", "", "Agilice su gestión de reservas", message);

  }


  exportDataBase(){

    this.plt.ready()
      .then(() => {
        let db = this.databaseProvider.exportAsSQL();
        db.then(value => {

          let date = new Date();
          let today =date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
          let name = "guudbed-"+today+".db";
          let options: IWriteOptions = {
            replace: true
          }
          let result = this.file.writeFile(this.file.externalRootDirectory, name, value.toString(), options)
            .then(function (success) {

                  }, e =>function (error) {

                   });
          let alert = this.alertCtrl.create({
            title: 'Base de datos exportada',
            subTitle: 'Su base de datos ha sido exportada y guardada en la raíz de almacenamiento de su memoria',
            buttons: ['Aceptar']
          });
          alert.present();
        });
      })
  }

  importDataBase(){

    this.plt.ready()
      .then(() => {

        let alert = this.alertCtrl.create({
          title: 'Confirmar',
          message: '¿Desea importar una nueva base de datos a Guudbed? El archivo debe estar en el directorio raíz ' +
          'de la memoria interna de su dispositivo y llamarse "guudbed.db"',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Aceptar',
              handler: () => {

                let sql = "";
                let f = this.file.readAsText(this.file.externalRootDirectory, "guudbed.db")
                  .then(function (success) {
                    sql = success;
                  }, e => function (error) {

                  });

                f.then(value => {

                  this.databaseProvider.importSQL(sql);
                  let alert = this.alertCtrl.create({
                    title: 'Base de datos importada',
                    subTitle: 'Su base de datos ha sido importada con éxito',
                    buttons: ['Aceptar']
                  });
                  alert.present();
                })

              }
            }]
        });
        alert.present();

   })
  }


  alertIcon(){

    let alert = this.alertCtrl.create({
      title: 'Contactar',
      subTitle: '<br>E-mail: lbencomo94@nauta.cu <br><br>Celular: 58236723',
      buttons: ['Aceptar']
    });
    alert.present();


  }





}
