import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//models
import {Prenotazione} from '../../models/prenotazione.model';
//providers
import {PrenotazioneProvider} from '../../providers/prenotazione/prenotazione.provider';

@IonicPage()
@Component({
  selector: 'page-rilascia-feedback',
  templateUrl: 'rilascia-feedback.html',
})
export class RilasciaFeedbackPage {
    
  public feedbacks : Array<Prenotazione> = [];
  
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
            //console.log(json);
            this.feedbacks =  json;
           
       });          
   }
   
   
   goInserisci(feedback : Prenotazione){
       this.navCtrl.push("InserisciFeedbackPage", {paramFeedback: feedback});
   }
}
