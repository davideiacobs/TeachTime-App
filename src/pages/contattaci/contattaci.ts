import { EmailComposer } from '@ionic-native/email-composer';
import { Injectable, Component } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { NavController, LoadingController, AlertController  } from 'ionic-angular';



@Component({
  selector: 'page-contattaci',
  templateUrl: 'contattaci.html'
})
@Injectable()
export class ContattaciPage {
  
  public oggetto : String;
  public messaggio : String;
  public email : any;

  constructor(public navCtrl: NavController , 

    public loadingCtrl: LoadingController,
    private emailComposer: EmailComposer) {
    this.oggetto = "";
    this.messaggio = "";
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
    this.email = {
        app : "gmail",
        to : "turbo.teachtime@gmail.com",
        subject : "",
        body : ""
    };
}
  


contattaci(){
 this.emailComposer.requestPermission().then(() =>{
      
      this.email["subject"] = this.oggetto;
      this.email["body"] = this.messaggio;
      this.emailComposer.open(this.email);
     });
  }
  
  
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ContattaciPage, {
      item: item
    });
  }
}



