import { SubirPage } from './../pages/subir/subir';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CargarArchivoProvider } from '../providers/cargar-archivo/cargar-archivo';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {  AngularFireAuth} from '@angular/fire/auth';

import { Camera} from '@ionic-native/camera';
import {ImagePicker} from '@ionic-native/image-picker'
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';


export const firebaseConfig = {
apiKey: "AIzaSyALbv3yfDMECPdHQDf0kU0xiJ2iy8hxbKs",
    authDomain: "ionframe-4eee9.firebaseapp.com",
    databaseURL: "https://ionframe-4eee9.firebaseio.com",
    projectId: "ionframe-4eee9",
    storageBucket: "ionframe-4eee9.appspot.com",
    messagingSenderId: "965119245195"
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    SubirPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule, 
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    SubirPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Camera,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CargarArchivoProvider
  ]
})
export class AppModule {}
