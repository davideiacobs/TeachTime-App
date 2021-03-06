import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//Models 
import {Categoria} from '../../models/categoria.model';

//Constants
import {MY_URL_BASE} from '../../constants';


@Injectable()
export class CategoriaProvider {

    private _categorie: Array<Categoria> = null;

    constructor(
        private _http: Http
    ) {

    }

    /**
     * Recupera le categorie dal server.
     */
    getCategorie(): Promise<Array<Categoria>> {
        return new Promise((resolve) => {
            if (this._categorie === null) {
                this._categorie = [];
                
                this._http.get(MY_URL_BASE+"categories").toPromise()
                    .then((res: Response) => {
                        const json = res.json();
 
                        for (let categoria of json) {
                            this._categorie.push(new Categoria(categoria));
                        }  
                           
                        resolve(this._categorie);
                        
                    })
                    .catch(() => resolve(this._categorie));
            } else {
                resolve(this._categorie);
            }
        });
    }
}
