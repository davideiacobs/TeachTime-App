import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController  } from 'ionic-angular';
import { Events } from 'ionic-angular';
//providers
import {RipetizioneProvider} from '../../providers/ripetizione/ripetizione.provider';
import {MateriaProvider} from '../../providers/materia/materia.provider';
//models
import {Ripetizione} from '../../models/ripetizione.model';
import {Materia} from '../../models/materia.model';

@IonicPage()
@Component({
  selector: 'page-modifica-ripetizione',
  templateUrl: 'modifica-ripetizione.html',
})

    export class ModificaRipetizionePage {
    
    citta : string = "";
    ripetizione:Ripetizione;
    subjects: Array<Materia> = [];


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public sSubjects: MateriaProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public sRipetizione: RipetizioneProvider,
              public events: Events) {
    
    
    this.ripetizione = this.navParams.get("paramRipetizione");
    this.citta = this.ripetizione.città;
    this.getMaterie(this.ripetizione.materie[0].categoria_key);
  }
  
  
  getMaterie(categoria:number){
            this.subjects = null;
            this.sSubjects.getMaterie(categoria).then(subjects => {
                this.subjects = subjects;

            });  

    }
    
    addMateriaToList(materia: any){
        var bool : boolean = true;
        
            if(materia.value!=""){
                if (this.ripetizione.materie.length != 0){
                    for (let m of this.ripetizione.materie){
                        if (bool && m.nome === materia.value){
                                bool = false;
                        }
                    }
                }
            if(bool){
                var newMateria2 : Materia = new Materia();
                newMateria2.categoria_key = this.ripetizione.materie[0].categoria_key;
                newMateria2.nome = materia.value;
                this.ripetizione.materie.push(newMateria2);
            }
          }
        
      }
      
      removeMateriaToList(materia: any){
        if (this.ripetizione.materie.length > 1){
            var i = 0;  
            for (let m of this.ripetizione.materie){
                  if(m.nome === materia.value){
                      this.ripetizione.materie.splice(i,1);
                  }
                  i++;
            }    
        }
    }
    
    
    updateRipetizione(){
        this._validate().then(() => {
            const loading = this.loadingCtrl.create({content: "Loading.." });
            loading.present();
            this.ripetizione.città = this.citta;
            delete this.ripetizione.categoria;

            this.sRipetizione.updRipetizione(this.ripetizione).then(() => {
                loading.dismiss().then(() => {
                            const alert = this.alertCtrl.create({
                                title: "TeachTime",
                                message: "Il tuo annuncio è stato aggiornato!",
                                buttons: ["OK"]
                            });
                            alert.present();
                            alert.onDidDismiss(() => {
                                this.events.publish("user:register");               
                            });
                        });
            });
         }).catch(() => {});
    }
    
    
    private _validate() {
        return new Promise((resolve, reject) => {
            let msg = "";
            if (this.ripetizione.costo < 1) {
                msg = "Inserisci il costo della ripetizione";
            } else if (this.citta === "") {
                msg = "Inserisci la città";
            } 
            if (msg !== "") {
                this.alertCtrl.create({
                    title: "TeachTime",
                    message: msg,
                    buttons: ["OK"]
                }).present();
                reject();
            } else {
                resolve();
            }
        });
    }
    

}