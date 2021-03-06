import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AddRoomPage} from "../pages/add-room/add-room";
import {CleaningPage} from "../pages/cleaning/cleaning";
import {ClientePage} from "../pages/cliente/cliente";
import {DetallesPage} from "../pages/detalles/detalles";
import {TabPage} from "../pages/tab/tab";
import {CommentsPage} from "../pages/comments/comments";

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

import {EmailComposer} from "@ionic-native/email-composer";
import { EmailProvider } from '../providers/email/email';
import {DatePicker} from "@ionic-native/date-picker";
import { File } from '@ionic-native/file';
import {FilterPage} from "../pages/filter/filter";
import {ProfilePage} from "../pages/profile/profile";

import { ScreenOrientation } from '@ionic-native/screen-orientation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AddEventPage,
    AddRoomPage,
    CleaningPage,
    ClientePage,
    DetallesPage,
    TabPage,
    CommentsPage,
    FilterPage,
    ProfilePage
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
    AddEventPage,
    AddRoomPage,
    CleaningPage,
    ClientePage,
    DetallesPage,
    TabPage,
    CommentsPage,
    FilterPage,
    ProfilePage
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
    EmailComposer,
    EmailProvider,
    DatePicker,
    File,
    ScreenOrientation
  ]
})
export class AppModule {}
