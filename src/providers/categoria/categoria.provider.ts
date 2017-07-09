import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//Models 
import {Categoria} from '../../models/categoria.model';

//Constants
import {URL_BASE, URL} from '../../constants';

//Types
import {ResponseServer} from '../../types';


@Injectable()
export class CategoriaProvider {

    private _categorie: Array<Categoria> = null;

    constructor(
        private _http: Http,
    ) {
        console.log('Hello Task Provider');

    }

    /**
     * Recupera i task dal server.
     */
    getCategorie(): Promise<Array<Categoria>> {
        return new Promise((resolve) => {
            if (this._categorie === null) {
                this._categorie = [];

                this._http.get(URL_BASE + URL.CATEGORIES.GETALL).toPromise()
                    .then((res: Response) => {
                        const json = res.json() as ResponseServer;

                        if (json.result) {
                            const categorie = json.data;
                            for (let categoria of categorie) {
                                this._categorie.push(new Categoria(categoria));
                            }
                            resolve(this._categorie);
                        } else {
                            resolve(this._categorie);
                        }
                    })
                    .catch(() => resolve(this._categorie));
            } else {
                resolve(this._categorie);
            }
        });
    }
}
