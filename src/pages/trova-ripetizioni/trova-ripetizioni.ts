import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

//Providers
import {CategoriaProvider} from '../../providers/categoria/categoria.provider';
import {MateriaProvider} from '../../providers/materia/materia.provider';
import {RipetizioneProvider} from '../../providers/ripetizione/ripetizione.provider';
import {UtenteProvider} from '../../providers/utente/utente.provider';


//Models
import {Categoria} from '../../models/categoria.model';
import {Materia} from '../../models/materia.model';
import {Ripetizione} from '../../models/ripetizione.model';



@IonicPage()
@Component({
  selector: 'page-trova-ripetizioni',
  templateUrl: 'trova-ripetizioni.html',

})
export class TrovaRipetizioniPage {
    selectedItem: any;
    categories: Array<Categoria> = [];
    subjects: Array<Materia> = [];
    lessons: Array<Ripetizione> = [];
    
    
    constructor(
        public navCtrl: NavController,
        public sCategories: CategoriaProvider,
        public sSubjects: MateriaProvider,
        public sLessons: RipetizioneProvider,
        public sUsers: UtenteProvider,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public navParams: NavParams
        ){
            this.sCategories.getCategorie()
                .then(categories => {
                    this.categories = categories;
                });
            this.selectedItem = navParams.get('item');
       
    }
    
    getMaterie(categoria:number){
        this.subjects = null;
        this.sSubjects.getMaterie(categoria).then(subjects => {
            this.subjects = subjects;
        })
        
    }
    
    
    getRipetizioni(materia:number,categoria:number,città:string){
        
        const loading = this.loadingCtrl.create({content: "Loading.." });
        loading.present();
        this.lessons = null;
        
        this.sLessons.getRipetizioni(categoria,materia,città).then(lessons => {
            loading.dismiss().then(() => {
            });
            var tmp : Array<Ripetizione> = [];
                if(lessons.length > 0){
                for(let lesson of lessons){

                    var tutor = lesson.tutor;
                    this.sUsers.getVoto(tutor).then(voto => {
                        lesson.tutor.voto = (typeof voto === "number") ? voto: tutor.voto;


                    });
                    tmp.push(lesson);
                }

                this.lessons = tmp;
            }

        })

    }
    
    goRipetizione(ripetizione : Ripetizione){
        this.navCtrl.push('RipetizionePage', {paramRipetizione:ripetizione});
    }
    

  
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(TrovaRipetizioniPage, {
      item: item
    });
  }

}
