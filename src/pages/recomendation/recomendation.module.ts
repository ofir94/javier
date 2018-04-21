import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecomendationPage } from './recomendation';

@NgModule({
  declarations: [
    RecomendationPage,
  ],
  imports: [
    IonicPageModule.forChild(RecomendationPage),
  ],
})
export class RecomendationPageModule {}
