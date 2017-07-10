import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//Providers
import {CategoriaProvider} from '../../providers/categoria/categoria.provider';
import {MateriaProvider} from '../../providers/materia/materia.provider';
import {RipetizioneProvider} from '../../providers/ripetizione/ripetizione.provider';
import {UtenteProvider} from '../../providers/utente/utente.provider';

//Models
import {Categoria} from '../../models/categoria.model';
import {Materia} from '../../models/materia.model';
import {Ripetizione} from '../../models/ripetizione.model';

/**
 * Generated class for the TrovaRipetizioniPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 
@Component({
  selector: 'page-trova-ripetizioni',
  templateUrl: 'trova-ripetizioni.html',

})
export class TrovaRipetizioniPage {

    categories: Array<Categoria> = [];
    subjects: Array<Materia> = [];
    lessons: Array<Ripetizione> = [];
    
    
    constructor(
        public navCtrl: NavController,
        public sCategories: CategoriaProvider,
        public sSubjects: MateriaProvider,
        public sLessons: RipetizioneProvider,
        public sUsers: UtenteProvider,
        ){
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
    
    getRipetizioni(materia:number,categoria:number,città:string){
        this.lessons = null;
        
        this.sLessons.getRipetizioni(categoria,materia,città).then(lessons => {
            var tmp : Array<Ripetizione> = [];
            for(let lesson of lessons){
                
                var tutor = lesson.tutor;
                this.sUsers.getVoto(tutor).then(voto => {
                    lesson.tutor.voto = (typeof voto === "number") ? voto: tutor.voto;
                    
                    
                });
                tmp.push(lesson);
            }
            
            this.lessons = tmp;

        })
       
        
    }
    
    

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrovaRipetizioniPage');
  }

}
