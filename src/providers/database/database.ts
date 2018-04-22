import { HttpClient } from '@angular/common/http'; //En el video usan  import { Http } from '@angular/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import {SQLitePorter} from "@ionic-native/sqlite-porter";
import {SQLiteObject, SQLite} from "@ionic-native/sqlite";
import {BehaviorSubject} from "rxjs/BehaviorSubject"; //En el video usan import {BehaviorSubject} from "rxjs/Rx";
import {Storage} from "@ionic/storage"; // en el video usan  import {IonicStorage} from "@ionic/storage";
import 'rxjs/add/operator/map';
import {Platform} from "ionic-angular";


/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  database: SQLiteObject; //Para la conexion de la bd
  private  databaseReady: BehaviorSubject<boolean>;
  constructor(public http: Http, private sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform)//Aqui en el video ponen Http pq es otro import
  {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() =>{
      this.sqlite.create({
        name: 'bedapp.db',
        location: 'default'   //aqui podemos decirle q se cree la bd en um lugar específico
      })
        .then((db: SQLiteObject) => {
        this.database = db;
        this.storage.get('database_filled').then(val =>{
          if(val) {
            this.databaseReady.next(true);
          }
          else {
            this.fillDatabase();
          }
        })
      });
    });
  }

  fillDatabase(){
    this.http.get('assets/bedbooking.sql')
      .map(res => res.text())
      .subscribe(sql =>{
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data =>{
            this.databaseReady.next(true);
            this.storage.set('database_filled', true);
          })
          .catch(e =>alert(e.getMessages()));
      })
  }

  /**
   * @public
   * @method importSQL
   * @param sql    {String}          The SQL data to be imported
   * @description          Imports the supplied SQL data to the application database
   * @return {Promise}
   */
  importSQL(sql 	: any)
  {
    alert("importing");
    return new Promise((resolve, reject) =>
    {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then((data) =>
        {
          resolve(data);
        })
        .catch((e) =>
        {
          reject(e);
        });
    });
  }

  /**
   * @public
   * @method exportAsSQL
   * @description          Exports SQL data from the application database
   * @return {Promise}
   */
  exportAsSQL()
  {
    return new Promise((resolve, reject) =>
    {
      this.sqlitePorter
        .exportDbToSql(this.database)
        .then((data) =>
        {
          resolve(data);
        })
        .catch((e) =>
        {
          reject(e);
        });
    });
  }



  addReservation(from_date, to_date, cant_adult, cant_kid, price, deposit,comment, cant_bed_single , cant_bed_double , id_room, status, id_client){
    let  data = [from_date, to_date, cant_adult, cant_kid, price, deposit,comment, cant_bed_single , cant_bed_double , id_room, status, id_client];
    return this.database.executeSql("INSERT INTO reservation (from_date, to_date, cant_adult, cant_kid, price, deposit, comment, cant_bed_single , cant_bed_double , id_room, status, id_client) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",data).then( res=> {
    return res;
    });
  }

  addClient(name, address, address2, state, postal_code, country, passport , identification ,phone, email){
    let  data = [name, address, address2, state, postal_code, country, passport , identification ,phone, email];
    return this.database.executeSql("INSERT INTO reservation (name, address, address2, state, postal_code, country, passport , identification ,phone, email) VALUES (?,?,?,?,?,?,?,?,?,?)",data).then( res=> {
      return res;
    });
  }
  addRoom(name, cant_people, cant_bed_aditional, cant_bed_single, cant_bed_double,view_order){
   let  data = [name, cant_people, cant_bed_aditional, cant_bed_single, cant_bed_double,view_order];
    return this.database.executeSql("INSERT INTO room (name, cant_people, cant_bed_aditional, cant_bed_single, cant_bed_double,view_order ) VALUES (?,?,?,?,?,?)",data).then( res=> {
    return res;
    });
  }

  updateCleaning(selected_option,fixed_day, after_exit, week_day, id_cleaning_object){
    let  data = [selected_option, fixed_day, after_exit, week_day, id_cleaning_object];
    return this.database.executeSql("UPDATE frequency SET selected_option = ?, fixed_day = ?, after_exit = ?, week_day = ? WHERE id_cleaning_object = ?",data).then( res=> {
      return res;
    });

  }

  getAllCleaning(){
    return this.database.executeSql("SELECT * FROM frequency",[]).then(data=> {
      let cleaning = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          cleaning.push({
            selected_option: data.rows.item(i).selected_option,
            fixed_day: data.rows.item(i).fixed_day,
            after_exit: data.rows.item(i).after_exit,
            week_day: data.rows.item(i).week_day,
            id_cleaning_object: data.rows.item(i).id_cleaning_object,
          });
        }
      }
      return cleaning;
    },err =>{
      alert(err);
      return [];
    });
  }

  getAllReservation(){
    return this.database.executeSql("SELECT * FROM reservation",[]).then(data=> {
      let reservation = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          reservation.push({
            from_date: data.rows.item(i).from_date,
            to_date: data.rows.item(i).to_date,
            cant_adult: data.rows.item(i).cant_adult,
            cant_kid: data.rows.item(i).cant_kid,
            status: data.rows.item(i).status,
          });
        }
      }
      return reservation;
    },err =>{
      alert(err);
      return [];
    });
  }

  getDatabaseState(){
    return this.databaseReady.asObservable();
  }

  getAllStatus(){
    return this.database.executeSql("SELECT * FROM reservation_status",[]).then(data=> {
      let reservation_status = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          reservation_status.push({
            id_status: data.rows.item(i).id_status,
            status: data.rows.item(i).status,

          });
        }
      }
      return reservation_status;
    },err =>{
      alert(err);
      return [];
    });
  }

  getAllRooms(){
    return this.database.executeSql("SELECT * FROM room ORDER BY view_order",[]).then(data=> {
      let rooms = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          rooms.push({
            id_room: data.rows.item(i).id_room,
            name: data.rows.item(i).name,
            cant_people: data.rows.item(i).cant_people,
            cant_bed_aditional: data.rows.item(i).cant_bed_aditional,
            cant_bed_single: data.rows.item(i).cant_bed_single,
            cant_bed_double: data.rows.item(i).cant_bed_double,
            view_order: data.rows.item(i).view_order
          });
        }
      }
      return rooms;
    },err =>{
      alert(err);
      return [];
    });
  }

}
