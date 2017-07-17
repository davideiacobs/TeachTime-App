import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import { Events } from 'ionic-angular';
//constants
import {MY_URL_IMG} from '../../constants';

//models
import {Prenotazione} from '../../models/prenotazione.model';
//providers
import {PrenotazioneProvider} from '../../providers/prenotazione/prenotazione.provider';

@IonicPage()
@Component({
  selector: 'page-inseriscifeedback',
  templateUrl: 'inseriscifeedback.html',
})
export class InserisciFeedbackPage {
  
  public feedback : Prenotazione;
  public rating : number;
  public my_url_img = MY_URL_IMG
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,  
              public sPrenotazione : PrenotazioneProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public events: Events
              ) {
      
      this.feedback = this.navParams.get("paramFeedback");
      this.rating = 0;
  }

  
  selectStar(n : number){
    if( n >=1 && n<=5){
          for (var i : number = 1; i <= 5; i++) {
                  if(i <= n){
                  document.getElementById("star" + i).setAttribute("name","star");
                  document.getElementById("star" + i).setAttribute("class","ion-md-star ion-ios-star icon");
                  }else{
                          document.getElementById("star" + i).setAttribute("name","star-outline");
                          document.getElementById("star" + i).setAttribute("class","ion-md-star-outline ion-ios-star-outline icon");
                  }
          }
    }else if( n >=6 && n<=10){	
          for (var k : number = 6; k <= 10; k++) {
                  if(k <= n){
                  document.getElementById("star" + k).setAttribute("name","star");
                  document.getElementById("star" + k).setAttribute("class","ion-md-star ion-ios-star icon");
                  }else{
                          document.getElementById("star" + k).setAttribute("name","star-outline");
                          document.getElementById("star" + k).setAttribute("class","ion-md-star-outline ion-ios-star-outline icon");
                  }
          }
    }else if( n >=11 && n<=15){

          for (var j : number = 11; j <= 15; j++) {
                  if(j <= n){
                  document.getElementById("star" + j).setAttribute("name","star");
                  document.getElementById("star" + j).setAttribute("class","ion-md-star ion-ios-star icon");
                  }else{
                          document.getElementById("star" + j).setAttribute("name","star-outline");
                          document.getElementById("star" + j).setAttribute("class","ion-md-star-outline ion-ios-star-outline icon");
                  }
          }
    }

  }

  inserisci(){
       const loading = this.loadingCtrl.create({content: "Loading.." });
        loading.present();
  	this.rating = Math.round(document.getElementsByName("star").length/3);
            this.feedback.voto = this.rating;
            this.sPrenotazione.inserisci(this.feedback).then( () => {
                loading.dismiss().then(() => {
                        const alert = this.alertCtrl.create({
                            title: "TeachTime",
                            message: "Il tuo feedback è stato inserito. Grazie per il contributo!",
                            buttons: ["OK"]
                        });
                        alert.present();
                        alert.onDidDismiss(() => {
                            this.events.publish('feedback:rilasciato');               
                        });
                    });
            });
  }

}
