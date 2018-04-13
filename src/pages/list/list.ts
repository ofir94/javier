import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ServicioProvider} from "../../providers/servicio/servicio";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  inicio;
  fin;
  tiempo;
  photos;
  photos2;
  arregloFotos;
  fotoActual = {postId: '', id: '', name: '', email: '', body: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public servicio: ServicioProvider) {
    // this.cargarServiciosSecuencial();
  }

  // ionViewDidLoad(){
  //   this.inicio = new Date();
  //   console.log(this.inicio);
  //    this.servicio.obtenerDatosFotosParalelos1()
  //     .subscribe(
  //       (data)=>{
  //         this.photos2 = data;
  //         this.photos = data;
  //                     },
  //
  //       (error)=>{console.log("Error Sandy");}
  //     )
  //
  //
  //
  //   // for (let foto1 of this.photos){
  //   //    for (let foto2 of this.photos2){
  //   //      if (foto1.id == foto2.id){
  //   //         let actual= this.fotoActual;
  //   //         actual.id = foto1.id;
  //   //         actual.postId = foto1.postId;
  //   //         actual.name = foto1.name;
  //   //         actual.email = foto2.email;
  //   //         actual.body = foto2.body;
  //   //         this.arregloFotos.push(actual);
  //   //      }
  //   //    }
  //   // }
  //   // console.log(this.arregloFotos);
  //   // this.photos2 = this.photos;
  //   //
  //   // for(let i = 0; i < 5000; i++){
  //   //   for(let j = 0; j < 5000; j++){
  //   //     if(this.photos[i].id == this.photos2[j].id){
  //   //       this.photos[i].url = this.photos2[j].url;
  //   //       this.photos[i].thumbnailUrl = this.photos2[j].thumbnailUrl;
  //   //     }
  //   //   }
  //   // }
  //   // this.fin = new Date();
  //   // let tiempo = this.fin-this.inicio;
  //   // console.log(tiempo);
  // }

  // ionViewDidLoad() {
  //   this.servicio.getComentariosUnidosSecuencial()
  //     .then(
  //       (photos) =>{
  //       this.photos = photos;
  //     })
  //
  // }

  // paralelo
  ionViewDidLoad() {
    this.inicio = new Date();
    console.log(this.inicio);
    this.servicio.getComentariosUnidosParalelo()
      .subscribe(photos => {
        this.photos = photos;
      }, error => {
        console.log(error);
      })
    this.fin = new Date();
     this.tiempo = this.fin-this.inicio;
    console.log(this.tiempo);
  }

  //secuencial
  // cargarServiciosSecuencial() {
  //   this.photos = this.photos2;
  //
  //   for(let i = 0; i < 6000;i++){
  //     for(let j = 0; j < 6000; j++){
  //       if(this.photos[i].id == this.photos2[j].id){
  //         this.photos[i].url = this.photos2[j].url;
  //         this.photos[i].thumbnailUrl = this.photos2[j].thumbnailUrl;
  //       }
  //
  //     }
  //   }
  //
  // }
}
