import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from "firebase";
import { ToastController } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';
/*
  Generated class for the CargarArchivoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CargarArchivoProvider {
  imagenes:Frame[]=[];
  miurl:string;


  constructor(private toastCtrl:ToastController, private afDB: AngularFireDatabase) {
    
  }

 cargar_imagen_firebase(archivo:Frame){
    let promesa=new Promise( (resolve, reject)=>{
      this.mostrar_toast("Loading");
      let storageRef=firebase.storage().ref();
      let nombreArchivo:string=new Date().valueOf().toString();

      let uploadTask: firebase.storage.UploadTask=
      storageRef.child(`fotos/${nombreArchivo}`)
                .putString(archivo.url,'base64',{contentType:'image/jpeg'});

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        ()=>{},
        (error)=>{
          console.log("Error");
          console.log(JSON.stringify(error));
          this.mostrar_toast(JSON.stringify(error));
          reject();
        },
        ()=>{
          console.log("File uploaded");
          this.mostrar_toast("Your imagen has been saved");
          uploadTask.snapshot.ref.getDownloadURL().then((u)=>{
            archivo.url=u;
            console.log("::::url::::"+archivo.url+":::");
            archivo.key=nombreArchivo;
            this.crear_registro_firebase(archivo);
          });
          resolve();
        }
        )          
    });
    return promesa

  }

  private crear_registro_firebase(archivo: Frame){
    console.log("registro firebase::::")
    console.log(JSON.stringify(archivo ));

    this.afDB.object(`/post/${archivo.key}`).update(archivo); 
    
    this.imagenes.push(archivo);
  }
  mostrar_toast( mensaje: string ){
    this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    }).present();
  }
}


interface Frame{
  url:string;
  titulo: string;
  autor: string;
  localizacion: string;
  copyright: string;
  key?:string;
}