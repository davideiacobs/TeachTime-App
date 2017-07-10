import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


//models
import {Ripetizione} from '../../models/ripetizione.model';
/**
 * Generated class for the RipetizionePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()

@Component({
  selector: 'page-ripetizione',
  templateUrl: 'ripetizione.html',
})


export class RipetizionePage {
    
  ripetizione : Ripetizione;
 
  constructor(public navCtrl: NavController, public navParams: NavParams){
 
    this.ripetizione = navParams.get("paramRipetizione");

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RipetizionePage');
  }

}
