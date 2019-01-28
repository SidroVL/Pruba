import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {  AngularFireAuth} from '@angular/fire/auth';
import { LoginPage } from '../login/login';




@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('username') username;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController, private aletCtrl:AlertController, private fire:AngularFireAuth) {
  }
  alert(message: string){
    this.aletCtrl.create({
      title: 'Info',
      subTitle:message,
      buttons: ['OK']
    }).present();
  }

registrar(){

  this.fire.auth.createUserAndRetrieveDataWithEmailAndPassword(this.username.value, this.password.value)
  .then(data=>{
    console.log('got data ',data);
    this.alert('You\'re now registered');
      this.navCtrl.setRoot(LoginPage);
  })
  .catch(error=>{
    console.log('got an error');
    this.alert(error.message);
  })
  console.log(this.username.value, this.password.value);

}
}
