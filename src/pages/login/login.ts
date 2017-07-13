import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import {AccountProvider} from '../../providers/account/account.provider';
import {UserSignupInterface} from '../../interfaces/user-signup.interface';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
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
            /*const loading = this.loadingCtrl.create({ content: this.sDictionary.get("LOADING_WAITING") });
            loading.present(); */
            this.sAccount.login(this.utente)
                .then(()=> { 
                })
                .catch((msg) => {
                    /* console.log("errore login: non mi sono riuscito a loggare");

                    loading.dismiss().then(() => {
                        this.alertCtrl.create({
                            title: this.sDictionary.get("APP_NAME"),
                            message: msg,
                            buttons: [this.sDictionary.get("OK")]
                        }).present();
                    });*/
                });
        }).catch(() => {});
    }

    goRegistrazione(){
        this.navCtrl.push("RegistrazionePage");
    }

    private _validate() {
        return new Promise((resolve, reject) => {
            let msg = "";
            if (this.utente.email.trim() === "") {
                msg = "Inserisci un email";
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
