import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import {UserSignupInterface} from '../../interfaces/user-signup.interface';
import {AccountProvider} from '../../providers/account/account.provider';
import { Events } from 'ionic-angular';
import {IMG_DEF} from '../../constants';

@IonicPage()
@Component({
  selector: 'page-registrazione',
  templateUrl: 'registrazione.html',
})
export class RegistrazionePage {
  
  citta : string;
  utente: UserSignupInterface;
  annoMax: string = "1999";
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public sAccount: AccountProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public events: Events
              ) 
    {  
      this.utente = {
            nome: "",
            cognome: "",
            dataDiNascita: null,
            telefono: "",
            email: "",
            città: "",
            pwd : "",
            titoloDiStudi : "",
            imgProfilo : IMG_DEF
        };
        this.citta = "";
  }

  
   
  
  
  registrati() {
        this.utente.città = this.citta;
        this._validate().then(() => {
            const loading = this.loadingCtrl.create({content: "Loading.." });
            loading.present();

                this.sAccount.registrati(this.utente)
                    .then(() => {

                        loading.dismiss().then(() => {
                            const alert = this.alertCtrl.create({
                                title: "TeachTime",
                                message: "Registrazione Completata. Benvenuto in TeachTime!",
                                buttons: ["OK"]
                            });
                            alert.present();
                            alert.onDidDismiss(() => {
                                //this.navCtrl.pop();
                                this.sAccount.login(this.utente).then(()=>{
                                    this.events.publish('user:register');
                                });

                            });
                        });
                    })
                    .catch(() => {
                        loading.dismiss();
                        this.alertCtrl.create({
                            title: "TeachTime",
                            message: "Registrazione non effettuata. Ricontrolla i tuoi dati.",
                            buttons: ["OK"]
                        }).present(); 
                    });
        }).catch(() => {});
    }
    
    
    private _validate() {
        return new Promise((resolve, reject) => {
            let msg = "";
            
            if (this.utente.nome.trim() === "") {
                msg = "Inserisci il tuo nome";
            } else if (this.utente.cognome.trim() === "") {
                msg = "Inserisci il tuo cognome";
            } else if (this.utente.dataDiNascita === null) {
                msg = "Inserisci la tua data di nascita";
            } else if (this.utente.email === "") {
                msg = "Inserisci la tua mail";
            } else if (this.utente.email.indexOf("@")===-1 || this.utente.email.indexOf(".")===-1){
                msg = "La mail inserita non è valida";
            } else if (this.utente.pwd === "") {
                msg = "Inserisci la tua password";
            } else if (this.utente.telefono.length < 10){
                msg = "Il numero di telefono inserito sembra non essere valido";
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
    
    
    goLogin(){
        //this.navCtrl.setRoot('LoginPage');
        this.events.publish('toLogin');
    }
    
    itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(RegistrazionePage, {
      item: item
    });
  }
  
  
  
}