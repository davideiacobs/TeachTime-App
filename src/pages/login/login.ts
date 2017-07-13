import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import {AccountProvider} from '../../providers/account/account.provider';
import {UserSignupInterface} from '../../interfaces/user-signup.interface';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	
        utente : UserSignupInterface;
  	constructor(public navCtrl: NavController, 
  		public navParams: NavParams,
  		public alertCtrl: AlertController,
        public sAccount: AccountProvider,
        public loadingCtrl: LoadingController){
        
        this.utente = {
            nome: "",
            cognome: "",
            dataDiNascita: null,
            telefono: "",
            email: "",
            città: "",
            pwd : ""
        };
                
        }

  login(){
        this._validate().then(() => {
            const loading = this.loadingCtrl.create({content: "Loading.." });
            loading.present();
            this.sAccount.login(this.utente)
                .then(() => {
                    loading.dismiss().then(() => {
                       // this.goProfile();
                       
                    });
                })
                .catch(() => {
                    loading.dismiss();
                    this.alertCtrl.create({
                        title: "TeachTime",
                        message: "Login Errato",
                        buttons: ["OK"]
                    }).present(); 
                });
        }).catch(() => {});
    }

    goRegistrazione(){
        this.navCtrl.push("RegistrazionePage");
    }
    
    goProfile(){
        this.navCtrl.setRoot("MioProfiloPage");
    }

    private _validate() {
        return new Promise((resolve, reject) => {
            let msg = "";
            if (this.utente.email.trim() === "") {
                msg = "Inserisci un email";
            }else if (this.utente.email.indexOf("@")===-1 || this.utente.email.indexOf(".")===-1){
                msg = "La mail inserita non è valida";
            } else if (this.utente.pwd.trim() === "") {
                msg = "Inserisci una password";
            }
            
            if (msg !== "") {
                this.alertCtrl.create({
                    title: "TeachTime",
                    message: msg,
                    buttons: ["OK"]
                }).present();
                
                reject();
            } else {
                resolve();
            }
        });
    }

}
