import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Utente } from '../../models/utente.model';
//providers
import {GeoProvider} from '../../providers/geo/geo.provider';
import { UtenteProvider} from '../../providers/utente/utente.provider';
import { AccountProvider } from '../../providers/account/account.provider';
import { UserPersistanceProvider } from '../../providers/userpersistance/userpersistance.provider';
import { MioProfiloPage } from '../../pages/mio-profilo/mio-profilo';


@IonicPage()
@Component({
  selector: 'page-modifica-profilo',
  templateUrl: 'modifica-profilo.html',
})
export class ModificaProfiloPage {
    
    utente : Utente = new Utente();
    citta : string = "";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public sUtente : UtenteProvider,
              public sAccount : AccountProvider,
              public token : UserPersistanceProvider,
              public loadingCtrl: LoadingController,  
              public alertCtrl: AlertController,
              public geo: GeoProvider              
              ) {
  	this.utente.set(navParams.get("paramUtente"));
        this.citta = this.utente.città;
  }

  UpdateProfile(){
   this._validate().then(() => {   
    this.sAccount.initialize().then(() =>{ 
      	this.token.get().then(json => {                     
                var id = json["utente_key"];
                var token = json["token"];  
                const loading = this.loadingCtrl.create({content: "Loading.." });
                loading.present();
                this.utente.città = this.citta;   
                this.sUtente.updateUtente(id,token,this.utente)
                        .then(() => {
                            loading.dismiss().then(() => {
                                const alert = this.alertCtrl.create({
                                    title: "TeachTime",
                                    message: "Aggiornamento Completato. Benvenuto in TeachTime!",
                                    buttons: ["OK"]
                                });
                                alert.present();
                                alert.onDidDismiss(() => {
                                    this.navCtrl.setRoot(MioProfiloPage);
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
                });
            });
      }).catch(() => {});
    }

    private _validate() {
        return new Promise((resolve, reject) => {
            let msg = "";
            if (this.utente.telefono.length < 10){
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
    
    
    geolocate(){
        const loading = this.loadingCtrl.create({content: "Loading.." });
        loading.present();
        this.geo.geolocate().then((city : any) => {
             this.citta = city;
             loading.dismiss(); 
        });
    }


}
