import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailProvider } from '../../providers/email/email';
import {HomePage} from "../home/home";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";

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
  public form  : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams
              , private _EMAIL       : EmailProvider
              ,private _FORM	    : FormBuilder,) {

    this.form = this._FORM.group({
      "message"       : ["", Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
  }


  save(){

    // Retrieve the validated form fields
    let message 	: string		= this.form.controls["message"].value;

    // Has the user selected an attachment?

      // If so call the sendEmail method of the EmailProvider service, pass in
      // the retrieved form data and watch the magic happen! :)
      this._EMAIL.sendEmail('ofir4991@gmail.com', "", "", "guudbed", message);



  }

}
