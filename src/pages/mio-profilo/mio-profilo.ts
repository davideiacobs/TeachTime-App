import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utente } from '../../models/utente.model';
import { Prenotazione } from '../../models/prenotazione.model';
import { UtenteProvider} from '../../providers/utente/utente.provider';
import { UserPersistanceProvider } from '../../providers/userpersistance/userpersistance.provider';
import {AccountProvider} from '../../providers/account/account.provider';


@IonicPage()
@Component({
  selector: 'page-mio-profilo',
  templateUrl: 'mio-profilo.html',
})
export class MioProfiloPage {
    selectedItem: any;
    citta : string = "";
    utente : Utente = new Utente();
    feedbacks: Array<Prenotazione> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public sAccount : AccountProvider, public token : UserPersistanceProvider,public sUtente : UtenteProvider) 
  {
  	this.getUser();
  }
    getUser(){
        this.sAccount.initialize().then(() => { 
            this.token.get().then(json => {                     
                var id = json["utente_key"];
                var token = json["token"]; 
                this.sUtente.getUtente(id,token).then( user => {                                
                    this.utente.set(user);
                    this.citta = this.utente.città;
                    this.getVoto();
                    this.getFeedback();
                }).catch(() => {});
            }).catch(() => {});	  
        });
    }

    getFeedback(){
    this.sUtente.getFeedback(this.utente).then( feedback2 => {
      console.log(feedback2);
      if(feedback2.length > 0)
      {
      for(let feedback of feedback2){
                this.feedbacks.push(new Prenotazione(feedback));
                console.log(this.feedbacks);
            }
      }
        });
    }

    getVoto(){
  	this.sUtente.getVoto(this.utente).then( voto => {
            this.utente.voto = (typeof voto === "number") ? voto: this.utente.voto;
        });
    }

    

  ionViewDidLoad() {
    console.log('ionViewDidLoad MioProfiloPage');
  }
  
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(MioProfiloPage, {
      item: item
    });
  }

}
