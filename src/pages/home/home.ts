import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  goTrovaRipetizioni(){
      this.navCtrl.setRoot("TrovaRipetizioniPage");
  }
  
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(HomePage, {
      item: item
    });
  }

  goAggiungiRipetizione(){
      this.navCtrl.push("OffriRipetizionePage");
  }

}
