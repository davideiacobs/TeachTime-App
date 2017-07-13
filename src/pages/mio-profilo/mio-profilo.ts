import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utente } from '../../models/utente.model';
import { Prenotazione } from '../../models/prenotazione.model';
import { UtenteProvider} from '../../providers/utente/utente.provider';
import { UserPersistanceProvider } from '../../providers/userpersistance/userpersistance.provider';



@IonicPage()
@Component({
  selector: 'page-mio-profilo',
  templateUrl: 'mio-profilo.html',
})
export class MioProfiloPage {

    utente : Utente = new Utente();
    lessons: Array<Prenotazione> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public token : UserPersistanceProvider,public sUtente : UtenteProvider) 
  {
  	this.getUser();

  }
    getUser(){
  	this.token.get().then(json => {                     
            var id = json["utente_key"];
            var token = json["token"]; 
            this.sUtente.getUtente(id,token).then( user => {                                
  		this.utente.set(user);
                this.getVoto();
            }).catch(() => {});
  	}).catch(() => {});	   
    }

    getVoto(){
  	this.sUtente.getVoto(this.utente).then( voto => {
            this.utente.voto = (typeof voto === "number") ? voto: this.utente.voto;
        });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MioProfiloPage');
  }

}