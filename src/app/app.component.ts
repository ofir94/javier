import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AddRoomPage} from "../pages/add-room/add-room";
import {CleaningPage} from "../pages/cleaning/cleaning";
import {CommentsPage} from "../pages/comments/comments";
import {RecomendationPage} from "../pages/recomendation/recomendation";
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
              private databaseProvider: DatabaseProvider

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
      RecomendationPage: RecomendationPage,
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
          let result = this.file.writeFile(this.file.externalRootDirectory, name, value.toString()) //ToDo -> Pasar opcion al final para sobre escribir el archivo exitente con el mismo nombre
            .then(function (success) {
                    alert("succes");
                  }, e =>function (error) {
                        alert("error");
                        alert(error);
                   });
        });
      })
  }

  importDataBase(){
    alert("importing started");
    this.plt.ready()
      .then(() => {

      let sql = "";
          this.file.readAsText(this.file.externalRootDirectory, "guudbed.db")
            .then(function (success) {

                  alert("success")
                  alert(success);
                  sql = success;
                  }, e =>function (error) {
                        alert("error");
                        alert(error);
                   });

          alert("provider")
          this.databaseProvider.importSQL(sql);


      })
  }


}
