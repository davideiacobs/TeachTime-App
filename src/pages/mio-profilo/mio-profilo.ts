import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
//models
import { Ripetizione } from '../../models/ripetizione.model';
import { Utente } from '../../models/utente.model';
import { Prenotazione } from '../../models/prenotazione.model';
//providers
import { UtenteProvider} from '../../providers/utente/utente.provider';
import { UserPersistanceProvider } from '../../providers/userpersistance/userpersistance.provider';
import {AccountProvider} from '../../providers/account/account.provider';
import {MY_URL_IMG} from '../../constants';
import {IMG_DEF} from '../../constants';
import {UPLOAD_IMG} from '../../constants';


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
    image : string =  "";
    img_upd : Utente = new Utente();
    fileTransfer: FileTransferObject = this.transfer.create();
    mioprofilo : string = "";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public sAccount : AccountProvider, 
              public token : UserPersistanceProvider,
              public sUtente : UtenteProvider,
              private transfer: FileTransfer,
              private camera: Camera) 
  {
        this.mioprofilo="profilo";
        this.image =  "";
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
                      if(this.utente.imgProfilo!=""){
                          this.image = MY_URL_IMG + this.utente.imgProfilo;
                      }else{
                          this.image = "assets/images/1.jpg";
                      }
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

    goModificaRipetizione(ripetizione: Ripetizione){
        this.navCtrl.push("ModificaRipetizionePage", {paramRipetizione:ripetizione});
    }

    goRegistrazione(){
        this.navCtrl.push("RegistrazionePage");
    }
    
     goAggiungiRipetizione(){
        this.navCtrl.push("OffriRipetizionePage");
    }
    
    
    upload() : Promise<any> {
     return new Promise((resolve, reject) => {
        var name = Math.random().toString();
        let options: FileUploadOptions = {
           fileKey: 'foto-profilo',
           fileName: name,
           params: {'directory': 'fotoProfilo', 'fileName': name}

        }
        if (this.image != this.utente.imgProfilo && this.image != IMG_DEF){
        this.fileTransfer.upload(this.image, UPLOAD_IMG+name , options, true)
         .then((data) => {
             resolve(name);
         }, (err) => {
           alert("Ops, c'è stato un problema di caricamento dell'immagine..");
           reject();
         });
        } 
     });
    }
    
    
    
   accessGallery(){
   this.camera.getPicture({
     sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
     destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.image = 'data:image/jpeg;base64,'+imageData;
      this.upload().then((name) => {
          //update profilo
          
           
          
          this.sAccount.initialize().then(()=>{
            this.token.get().then(json => { 
              var token = json["token"]; 
              var id = json["utente_key"];
              this.sUtente.getUtente(id,token).then( user => {                                
                      this.img_upd.set(user);
                      this.citta = this.img_upd.città;
                      this.img_upd.imgProfilo = name;
              this.sUtente.updateUtente(id,token,this.img_upd).then(() => {});
            });
            });
         });
          
      });
     }, (err) => { });
      
  }
    
  
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(MioProfiloPage, {
      item: item
    });
  }

}
