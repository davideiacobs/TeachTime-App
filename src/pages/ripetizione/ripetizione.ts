import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//models
import {Ripetizione} from '../../models/ripetizione.model';
//providers
import {AccountProvider} from '../../providers/account/account.provider';
import {UserPersistanceProvider} from '../../providers/userpersistance/userpersistance.provider';
import {UtenteProvider} from '../../providers/utente/utente.provider';


@IonicPage()

@Component({
  selector: 'page-ripetizione',
  templateUrl: 'ripetizione.html',
})


export class RipetizionePage {
  
  isLogged : boolean;    
  ripetizione : Ripetizione;
 
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public sAccount : AccountProvider,
              public sUserPersistance : UserPersistanceProvider,
              public sUtente : UtenteProvider
      ){

    this.ripetizione = navParams.get("paramRipetizione");
    this.isLogged = this.sAccount.isLogged();

    
  }
  
  
  goPrenotazione(ripetizione : Ripetizione){
      
      this.isLogged = this.sAccount.isLogged();
      if(this.isLogged){
          this.sUserPersistance.get().then(json => {                     
            var id = json["utente_key"];
            var token = json["token"]; 
            this.sUtente.getUtente(id,token).then( user => {        
  		this.navCtrl.push("PrenotatiPage", {paramRipetizione:ripetizione, paramUtente:user, token:token} );
            }).catch(() => {});
  	}).catch(() => {});	   
        
      }else{
         //login
          this.navCtrl.push("LoginPage");
      }
  }

  
 

}
