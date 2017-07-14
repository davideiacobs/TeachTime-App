import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { DatePipe } from '@angular/common';

//models
import { Ripetizione } from '../../models/ripetizione.model';
import { Utente } from '../../models/utente.model';
import { Materia } from '../../models/materia.model';
import {Prenotazione} from '../../models/prenotazione.model';

//providers
import {PrenotazioneProvider} from '../../providers/prenotazione/prenotazione.provider';

@IonicPage()
@Component({
  selector: 'page-prenotati',
  templateUrl: 'prenotati.html',
})
export class PrenotatiPage {
  
  ora : Date;
  token : string;
  prenotazione : Prenotazione = new Prenotazione();
  ripetizione : Ripetizione;
  utente : Utente;
  currentDate : String = "";
  materie : Array<Materia> = [];
    
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public datepipe: DatePipe,
              public sPrenotazioneProvider: PrenotazioneProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
     
      this.currentDate =  new Date().toISOString();

      console.log(this.currentDate);
      this.token = navParams.get("token");
      this.ripetizione = navParams.get("paramRipetizione");
      this.utente = navParams.get("paramUtente");
      this.materie = this.ripetizione.materie;
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrenotatiPage');
  }
  
  inviaPrenotazione(){
      const loading = this.loadingCtrl.create({content: "Loading.." });
      loading.present();
      this.prenotazione.ripetizione_key = this.ripetizione.key;
      this.prenotazione.materia_key = + this.prenotazione.materia_key;
      let latest_date =this.datepipe.transform(this.prenotazione.data, 'yyyy-MM-dd');
      var datetime : string = latest_date + "T" + this.ora+":00+02";
      this.prenotazione.stato = 0;
      this.prenotazione.data = datetime;
      this.sPrenotazioneProvider.prenotati(this.prenotazione, this.token).then( () => {
          loading.dismiss().then(() => {
                        const alert = this.alertCtrl.create({
                            title: "TeachTime",
                            message: "Prenotazione Effettuata con Successo! Attendi l'email di conferma da parte del tutor.",
                            buttons: ["OK"]
                        });
                        alert.present();
                        alert.onDidDismiss(() => {
                            //this.navCtrl.pop();
                            this.navCtrl.pop();
                        });
                    });
      }).catch(() => {
        loading.dismiss().then(() => {
                        const alert = this.alertCtrl.create({
                            title: "TeachTime",
                            message: "Qualcosa è andato storto..",
                            buttons: ["OK"]
                        });
                        alert.present();
                        alert.onDidDismiss(() => {
                            
                        });
                    });  
      });
      
      
      
      
  }

}

