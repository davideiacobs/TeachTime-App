import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {CategoriaProvider} from '../../providers/categoria/categoria.provider';
import {MateriaProvider} from '../../providers/materia/materia.provider';
import {Categoria} from '../../models/categoria.model';
import {Materia} from '../../models/materia.model';
/**
 * Generated class for the OffriRipetizionePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-offri-ripetizione',
  templateUrl: 'offri-ripetizione.html',
})
export class OffriRipetizionePage{

  categories: Array<Categoria> = [];
  subjects: Array<Materia> = [];
  choosesubject : Array<Materia> = [];
  //singlesubject  : Materia ;
  //defaultsubject  : Materia ;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,public sCategories: CategoriaProvider,public sSubjects: MateriaProvider) {
    
    //this.singlesubject = new Materia();
    //this.defaultsubject = new Materia();
    this.getCategories();
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

      /*this.singlesubject.nome != "")
      {
        let savesubject=this.singlesubject;
       this.choosesubject.push(savesubject);
      }else{
        let savesubject=this.defaultsubject;
        this.choosesubject.push(savesubject);
      }*/



  ionViewDidLoad() {
    console.log('ionViewDidLoad OffriRipetizionePage');
  }


}
