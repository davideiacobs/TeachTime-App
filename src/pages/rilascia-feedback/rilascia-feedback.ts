import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//models
import {Prenotazione} from '../../models/prenotazione.model';
//providers
import {PrenotazioneProvider} from '../../providers/prenotazione/prenotazione.provider';
//constants
import {MY_URL_IMG} from '../../constants';


@IonicPage()
@Component({
  selector: 'page-rilascia-feedback',
  templateUrl: 'rilascia-feedback.html',
})
export class RilasciaFeedbackPage {
    
  public feedbacks : Array<Prenotazione> = [];
  public my_url_img = MY_URL_IMG
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public sPrenotazioneProvider : PrenotazioneProvider) {
      
      this.recuperaFeedbacks();    
  }


  
   itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
      this.navCtrl.push(RilasciaFeedbackPage, {
      item: item
    });
   }
  
   recuperaFeedbacks(){
       this.sPrenotazioneProvider.recuperaFeedbacks().then(json =>  { 
            this.feedbacks =  json;
            console.log(json);
           
       });          
   }
   
   
   goInserisci(feedback : Prenotazione){
       this.navCtrl.push("InserisciFeedbackPage", {paramFeedback: feedback});
   }
}
