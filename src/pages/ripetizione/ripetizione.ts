import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//models
import {Ripetizione} from '../../models/ripetizione.model';
//providers
import {AccountProvider} from '../../providers/account/account.provider';

@IonicPage()

@Component({
  selector: 'page-ripetizione',
  templateUrl: 'ripetizione.html',
})


export class RipetizionePage {
  
  isLogged : boolean;    
  ripetizione : Ripetizione;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public sAccount : AccountProvider){

    this.ripetizione = navParams.get("paramRipetizione");
    this.isLogged = this.sAccount.isLogged();

    
  }

  
 

}
