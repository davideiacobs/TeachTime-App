import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//Providers
import {CategoriaProvider} from '../../providers/categoria/categoria.provider';

//Models
import {Categoria} from '../../models/categoria.model';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    categories: Array<Categoria> = [];
    
    constructor(
        public navCtrl: NavController,
        public sCategories: CategoriaProvider    ) {
        this.sCategories.getCategorie()
            .then(categories => {
                this.categories = categories;
            });
       
    }
     

}
