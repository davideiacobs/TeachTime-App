import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {MY_URL_BASE} from '../../constants';
//Models 
import {Materia} from '../../models/materia.model';


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
                
                this._http.get(MY_URL_BASE+"categories/"+categoria+"/subjects").toPromise()
                    .then((res: Response) => {
                        const json = res.json();
                        for (let materia of json) {
                            this._materie.push(new Materia(materia));
                        }  
                           
                        resolve(this._materie);
                        
                    })
                    .catch(() => resolve(this._materie));
            
        });
    }
}