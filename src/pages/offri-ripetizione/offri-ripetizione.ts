import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
//providers
import {CategoriaProvider} from '../../providers/categoria/categoria.provider';
import {MateriaProvider} from '../../providers/materia/materia.provider';
import {RipetizioneProvider} from '../../providers/ripetizione/ripetizione.provider';
//models
import {Categoria} from '../../models/categoria.model';
import {Materia} from '../../models/materia.model';
import {Ripetizione} from '../../models/ripetizione.model';


@IonicPage()
@Component({
  selector: 'page-offri-ripetizione',
  templateUrl: 'offri-ripetizione.html',
})
export class OffriRipetizionePage{
    
  citta: string = "";
  categories: Array<Categoria> = [];
  subjects: Array<Materia> = [];
  choosesubject : Array<Materia> = [];
  ripetizione : Ripetizione;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public sCategories: CategoriaProvider,
              public sSubjects: MateriaProvider,
              public sRipetizione: RipetizioneProvider,
              public events: Events
              ) {
              
    this.getCategories();
    this.ripetizione = new Ripetizione();
  }

  getCategories(){
    this.sCategories.getCategorie()
      .then(categories => {
          this.categories = categories;
      });
  }

  getMaterie(categoria:number){
        this.subjects = null;
        this.sSubjects.getMaterie(categoria).then(subjects => {
            this.subjects = subjects;
        })
        
    }

    addMateriaToList(materiaNuova : any, materia: any, categoria:any){
        var bool : boolean = true;
        if(materiaNuova.value!=""){
            if (this.choosesubject.length != 0){
                for (let m of this.choosesubject){
                    
                    if (bool && m.nome === materiaNuova.value){
                        bool = false;
                    }
                }
            }
            if(bool){
                var newMateria : Materia = new Materia();
                newMateria.categoria_key = parseInt(categoria.value);
                newMateria.nome = materiaNuova.value;

                this.choosesubject.push(newMateria);
            }
        }else{
            if(materia.value!=""){
                if (this.choosesubject.length != 0){
                    for (let m of this.choosesubject){
                        if (bool && m.nome === materia.value){
                                bool = false;
                        }
                    }
                }
            if(bool){
                var newMateria2 : Materia = new Materia();
                newMateria2.categoria_key = parseInt(categoria.value);
                newMateria2.nome = materia.value;
                this.choosesubject.push(newMateria2);
            }
          }
        }
      }
      
      removeMateriaToList(materia: any){
        var i = 0;  
        for (let m of this.choosesubject){
              if(m.nome === materia.value){
                  this.choosesubject.splice(i,1);
              }
              i++;
          }    
    }
    
    
    aggiungi(){
        this._validate().then(() => {
            const loading = this.loadingCtrl.create({content: "Loading.." });
            loading.present();
            this.ripetizione.città = this.citta;
            this.ripetizione.materie = this.choosesubject;
            this.sRipetizione.addRipetizione(this.ripetizione).then(() => {
                loading.dismiss().then(() => {
                            const alert = this.alertCtrl.create({
                                title: "TeachTime",
                                message: "Il tuo annuncio è stato inserito!",
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
            } else if (this.ripetizione.materie.length < 1){
                msg = "Scegli almeno una materia";
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
