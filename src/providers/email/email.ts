import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer';
/*
  Generated class for the EmailProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EmailProvider {

  constructor(public http: HttpClient,
              private _EMAIL   : EmailComposer) {
    console.log('Hello EmailProvider Provider');
  }

  /**
   *
   * @public
   * @method sendMail
   * @param to    			{string}    The primary e-mail address
   * @param cc    			{string}    The carbon copy e-mail address
   * @param bcc   			{string}    The blank carbon copy e-mail address
   * @param attachment     {string}    The attachment to be sent
   * @param subject        {string}    The subject for the e-mail message
   * @param body           {string}    The message content
   *
   */

  sendEmail(to         : string,
            cc         : string,
            bcc        : string,
            subject    : string,
            body       : string) : void
  {
    // Use the plugin isAvailable method to check whether
    // the user has configured an email account
    this._EMAIL.isAvailable()
      .then((available: boolean) =>
      {

        // Check that plugin has been granted access permissions to
        // user's e-mail account
        this._EMAIL.hasPermission()
          .then((isPermitted : boolean) =>
          {

            // Define an object containing the
            // keys/values for populating the device
            // default mail fields when a new message
            // is created
            let email : any = {
              app 			: 'mailto',
              to 			: to,
              cc 			: cc,
              bcc 			: bcc,
              subject 		: subject,
              body 		: body
            };

            // Open the device e-mail client and create
            // a new e-mail message populated with the
            // object containing our message data
            this._EMAIL.open(email);
          })
          .catch((error : any) =>
          {
            alert('No access permission granted');
            alert(error);
          });
      })
      .catch((error : any) =>
      {
        alert('User does not appear to have device e-mail account');
        alert(error);
      });
  }
}
