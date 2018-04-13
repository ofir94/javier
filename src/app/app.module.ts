import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Calendar } from '@ionic-native/calendar';

import { AddEventPage } from '../pages/add-event/add-event';

import { DatabaseProvider } from '../providers/database/database';
import {IonicStorageModule} from "@ionic/storage";
import {HttpModule} from "@angular/http";

import {SQLitePorter} from "@ionic-native/sqlite-porter";
import {SQLite} from "@ionic-native/sqlite";

import { IonicSwipeAllModule } from 'ionic-swipe-all';

import { NativePageTransitions } from '@ionic-native/native-page-transitions';

import { ViewportModule } from 'angular2-viewport';

import { InfiniteListModule } from 'angular-infinite-list'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {ServicioProvider} from "../providers/servicio/servicio";
import {HttpClientModule} from "@angular/common/http";
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AddEventPage,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    IonicSwipeAllModule,
    ViewportModule,
    InfiniteListModule,
    InfiniteScrollModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AddEventPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Calendar,
    DatabaseProvider,
    SQLite,
    SQLitePorter,
    NativePageTransitions,
    ViewportModule,
    ServicioProvider,

  ]
})
export class AppModule {}
