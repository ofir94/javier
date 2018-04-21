import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import {HomePage} from "../home/home";

/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  comments: "";

  constructor(public navCtrl: NavController, public navParams: NavParams
              ,private emailComposer: EmailComposer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
  }


  save(){

    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        let email = {
          to: 'ofir4991@gmail.com',
          subject: 'Guudbed - Comentarios e ideas',
          body: this.comments,
          isHtml: true
        };

// Send a text message using default options
        this.emailComposer.open(email);
        this.navCtrl.setRoot(HomePage);
      }
    });



  }

}
