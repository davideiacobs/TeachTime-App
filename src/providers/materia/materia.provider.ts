import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//Models 
import {Materia} from '../../models/materia.model';

/*
  Generated class for the MateriaProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MateriaProvider {
    
    private _materie: Array<Materia> = null;
  
  constructor( private _http: Http) {
    
  }
  
  /**
     * Recupera le categorie dal server.
     */
    getMaterie(categoria:number): Promise<Array<Materia>> {
        return new Promise((resolve) => {
           
                this._materie = [];
                
                this._http.get("http://localhost:8091/teachTime/MainApplication/rest/categories/"+categoria+"/subjects").toPromise()
                    .then((res: Response) => {
                        const json = res.json();
                        console.log(json);
                        for (let materia of json) {
                            this._materie.push(new Materia(materia));
                        }  
                           
                        resolve(this._materie);
                        
                    })
                    .catch(() => resolve(this._materie));
            
        });
    }
}