import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//Providers
import {CategoriaProvider} from '../../providers/categoria/categoria.provider';
import {MateriaProvider} from '../../providers/materia/materia.provider';

//Models
import {Categoria} from '../../models/categoria.model';
import {Materia} from '../../models/materia.model';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    categories: Array<Categoria> = [];
    subjects: Array<Materia> = [];
    
    constructor(
        public navCtrl: NavController,
        public sCategories: CategoriaProvider,
        public sSubjects: MateriaProvider    ) {
        this.sCategories.getCategorie()
            .then(categories => {
                this.categories = categories;
            });
       
    }
    
    getMaterie(categoria:number){
        console.log("ciao");
        this.subjects = null;
        this.sSubjects.getMaterie(categoria).then(subjects => {
            this.subjects = subjects;
        })
        
    }
     

}
