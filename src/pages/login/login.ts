import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import {  AngularFireAuth} from '@angular/fire/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

 @ViewChild('username') username;
 @ViewChild('password') password;

 
  constructor(private navCtrl: NavController, private aletCtrl:AlertController, private fire: AngularFireAuth) {
  }

  alert(message: string){
    this.aletCtrl.create({
      title: 'Info',
      subTitle:message,
      buttons: ['OK']
    }).present();
  }
  login(){
    this.fire.auth.signInWithEmailAndPassword(this.username.value, this.password.value)
    .then(data =>{
      console.log('got some data ', this.fire.auth.currentUser);
      this.alert('You\'re loggen in');
      this.navCtrl.setRoot(HomePage);
    })
    .catch(error=>{
      console.log('got an error ',error);
      this.alert(error.message);
    })
   console.log(this.username.value, this.password.value);
  
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

}
