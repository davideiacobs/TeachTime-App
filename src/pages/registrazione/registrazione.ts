import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import {UserSignupInterface} from '../../interfaces/user-signup.interface';
import {AccountProvider} from '../../providers/account/account.provider';


/**
 * Generated class for the RegistrazionePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-registrazione',
  templateUrl: 'registrazione.html',
})
export class RegistrazionePage {
    
  base64Image:any;
  utente: UserSignupInterface;
  
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
            mail: "",
            città: "",
            pwd : ""
        };
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
        
        this._validate().then(() => {
            console.log("wewe")
            /*const loading = this.loadingCtrl.create({content: this.sDictionary.get("LOADING_WAITING") });
            loading.present();
            */
            this.sAccount.registrati(this.utente)
                .then(() => {
                    /*loading.dismiss().then(() => {
                        const alert = this.alertCtrl.create({
                            title: this.sDictionary.get("APP_NAME"),
                            message: this.sDictionary.get("TEXT_SIGNUP_SUCCESS"),
                            buttons: [this.sDictionary.get("OK")]
                        });
                        alert.present();
                        alert.onDidDismiss(() => {
                            this.navCtrl.pop();
                        });
                    });*/
                })
                .catch(msg => {
                    /*loading.dismiss();
                    this.alertCtrl.create({
                        title: this.sDictionary.get("APP_NAME"),
                        message: msg,
                        buttons: [this.sDictionary.get("OK")]
                    }).present();*/
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
            } else if (this.utente.mail === "") {
                msg = "Inserisci la tua mail";
            } else if (this.utente.pwd === "") {
                msg = "Inserisci la tua password";
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