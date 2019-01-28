import { Component } from '@angular/core';
import { IonicPage, ViewController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { CargarArchivoProvider } from '../../providers/cargar-archivo/cargar-archivo';

/**
 * Generated class for the SubirPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {
  titulo:string ;
  imagenPreview:string;
  imagen64:string;
  autor: string;
  localizacion: string;
  copyright: string;;
  constructor(private viewCtrl:ViewController,
            private camera:Camera, private imagePicker:ImagePicker,
            private carga:CargarArchivoProvider,
            private toastCtrl: ToastController   ) {
              this.titulo="";
              this.imagenPreview="";
              this.autor="";
              this.localizacion="";
              this.copyright="";
  }

  cerrar_modal(){
    this.viewCtrl.dismiss();
  }

  mostrar_camara(){
    const options: CameraOptions={
      quality:20,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
    }

    this.camera.getPicture(options).then((imageData) => {
      
      this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
      this.imagen64 = imageData; 
      console.log("ok camara");
     }, (err) => {
      
      console.log ("Error en camara:", JSON.stringify(err));
     });

  }

  seleccionar_foto(){

    let opciones: ImagePickerOptions ={
      quality: 100,
      height: 300,
      width: 300,
      outputType: 1, //0 URI, 1 base64
      maximumImagesCount: 1 //para seleccionar una sola imagen
    };
    console.log ("vamos a seleccionar");
    this.imagePicker.getPictures(opciones).then((results) => {
      //aunque tenemos una sola img hay que hacer bucle por compatibilidad con iOS
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
          this.imagenPreview = "data:image/jpeg;base64,"+ results[i];
          this.imagen64 = results[i]; //esto lo añadimos al crear_post()
      }
    }, (err) => {console.log ("Error en seleccion", JSON.stringify(err)) })
  }

  crear_post(){
    let archivo = {
      url: this.imagen64,
      titulo: this.titulo,
      autor: this.autor,
      localizacion:this.localizacion,
      copyright:this.copyright

    };
    this.carga.cargar_imagen_firebase(archivo).then(()=>this.cerrar_modal());
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SubirPage');
  }

}
