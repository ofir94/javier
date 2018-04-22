import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatabaseProvider} from "../../providers/database/database";
import {HomePage} from "../home/home";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = {id_profile: 1,name_business: '',country: '',postal_code: '',city: '',street: '',phone: '',email: '',web: '',facebook: ''};
  public form  : FormGroup;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _FORM	    : FormBuilder,
              private databaseProvider: DatabaseProvider
  ) {
    /*this.form = this._FORM.group({
      "message"       : ["", Validators.required]
    });
*/

    this.databaseProvider.getDatabaseState().subscribe(rdy => {
      if(rdy){
        this.loadProfileData();
      }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  loadProfileData(){
    this.databaseProvider.getProfile().then(data => {
      let prof = data;
      for(let one_prof of prof) {
        this.profile.name_business = one_prof.name_business;
        this.profile.country = one_prof.country;
        this.profile.postal_code = one_prof.postal_code;
        this.profile.city = one_prof.city;
        this.profile.street = one_prof.street;
        this.profile.phone = one_prof.phone;
        this.profile.email = one_prof.email;
        this.profile.web = one_prof.web;
        this.profile.facebook = one_prof.facebook;
      }

    });

  }

  save(){

    this.databaseProvider.updateProfile(this.profile.id_profile,this.profile.name_business,this.profile.country,
                                        this.profile.postal_code,this.profile.city,this.profile.street,this.profile.phone,this.profile.email,
                                        this.profile.web,this.profile.facebook);
    this.navCtrl.setRoot(HomePage);

  }


}
