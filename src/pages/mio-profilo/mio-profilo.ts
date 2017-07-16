import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//models
import { Ripetizione } from '../../models/ripetizione.model';
import { Utente } from '../../models/utente.model';
import { Prenotazione } from '../../models/prenotazione.model';
//providers
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
    ripetizioni: Array<Ripetizione> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public sAccount : AccountProvider, public token : UserPersistanceProvider,public sUtente : UtenteProvider) 
  {
  	this.getUser();
        this.getRipetizioni();
  }
    getUser(){
        this.sAccount.initialize().then(()=>{
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
      
      if(feedback2.length > 0)
      {
      for(let feedback of feedback2){
                this.feedbacks.push(new Prenotazione(feedback));
            }
      }
        });
    }

    getRipetizioni(){
        this.sAccount.initialize().then(()=>{
          this.token.get().then(json => { 
            var token = json["token"]; 
           this.sUtente.getRipetizioni(token).then(lessons => {
                  this.ripetizioni = lessons;
            });
         });
         });
    }

    getVoto(){
  	this.sUtente.getVoto(this.utente).then( voto => {
            this.utente.voto = (typeof voto === "number") ? voto: this.utente.voto;
        });
    }

    goModificaProfilo(){
        this.navCtrl.push("ModificaProfiloPage",{paramUtente:this.utente});
    }

    goModificaRipetizione(){
        this.navCtrl.push("ModificaRipetizionePage");
    }

    goRegistrazione(){
        this.navCtrl.push("RegistrazionePage");
    }


  
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(MioProfiloPage, {
      item: item
    });
  }

}
