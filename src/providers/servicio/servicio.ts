import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";

//estos imports son pa ejecutarlo en paralelo
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';

//estos imports son para ejecutarlo secuencial
import 'rxjs/add/operator/toPromise';



/*
  Generated class for the ServicioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicioProvider {

  inicio;
  fin;
  photos1;
  photos2;
  constructor(public http: HttpClient) {
    console.log('Hello ServicioProvider Provider');
  }
  obtenerDatosFotosParalelos1(){
     return this.http.get('http://localhost:0080/photos.json');//../../../assets/json/comments.js//
  }
  obtenerDatosFotosParalelos2(){
    return this.http.get('http://localhost:0080/photos.json');
  }
  obtenerDatosFotos1(){
    return this.http.get('http://localhost:0080/photos.json')
  .toPromise();
  }
  obtenerDatosFotos2(){
    return this.http.get('http://localhost:0080/photos.json')
  .toPromise();
  }

  getComentariosUnidosParalelo(){
    // this.inicio = new Date();
    // console.log(this.inicio);
    return Observable.forkJoin(
      this.obtenerDatosFotosParalelos1(),
      this.obtenerDatosFotosParalelos2()
  )
        .map(res => this.join( res[0], res[1] ));


  }

  join(photos1, photos2){
    return photos1.map(photos1 => {
      return photos2
        .filter(photos2 => photos2.id == photos1.id)
        .map(photos2 => {
          return {
            albumId: photos1.albumId,
            id: photos1.id,
            title: photos1.title,
            url: photos2.url,
            thumbnailUrl: photos2.thumbnailUrl
          }
        })
    }).reduce((a,b) =>{
      let resultado = a.concat(b);
      // this.fin = new Date();
      // let tiempo = this.fin-this.inicio;
      // console.log(tiempo);
      return resultado;

    }, []);


  }

  getComentariosUnidosSecuencial(){


    return this.obtenerDatosFotos1()
      .then(photos1 =>{
      this.photos1 = photos1;
      return this.obtenerDatosFotos2();
    })
      .then(photos2 =>{
        this.photos2 = photos2;
        return Promise.resolve(this.join(this.photos1, this.photos2))
      })
      .catch(error => {
        return Promise.reject(error)
      })

  }


}
