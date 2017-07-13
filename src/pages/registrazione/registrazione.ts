import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import {UserSignupInterface} from '../../interfaces/user-signup.interface';
import {AccountProvider} from '../../providers/account/account.provider';

@IonicPage()
@Component({
  selector: 'page-registrazione',
  templateUrl: 'registrazione.html',
})
export class RegistrazionePage {
  citta : string;
  base64Image:any;
  utente: UserSignupInterface;
  annoMax: string = "1999";
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public camera:Camera, 
              public sAccount: AccountProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController
              ) 
    {  
      this.utente = {
            nome: "",
            cognome: "",
            dataDiNascita: null,
            telefono: "",
            email: "",
            città: "",
            pwd : ""
        };
        this.citta = "";
  }

  accessGallery(){
   this.camera.getPicture({
     sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
     destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
     }, (err) => {
      console.log(err);
    });
  }
  
  
  registrati() {
        console.log(this.utente);
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
                            this.navCtrl.push("LoginPage");
                        });
                    });
                })
                .catch(() => {
                    loading.dismiss();
                    this.alertCtrl.create({
                        title: "TeachTime",
                        message: "Qualcosa è andato storto..",
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
        this.navCtrl.pop();
    }
  
  
  
}