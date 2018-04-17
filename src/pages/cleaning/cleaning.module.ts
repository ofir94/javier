import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CleaningPage } from './cleaning';

@NgModule({
  declarations: [
    CleaningPage,
  ],
  imports: [
    IonicPageModule.forChild(CleaningPage),
  ],
})
export class CleaningPageModule {}
