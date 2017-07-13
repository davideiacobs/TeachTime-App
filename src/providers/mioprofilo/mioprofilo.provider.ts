import { Injectable } from '@angular/core';
import { Http , Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Utente } from '../../models/utente.model';

/*
  Generated class for the MioprofiloProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MioprofiloProvider {

	private _utente: Utente = null;

  constructor(private _http: Http) {
    console.log('Hello MioprofiloProvider Provider');
  }

  getUtente(id : number, token:string): Promise<Utente> {
        return new Promise((resolve) => {
                this._utente = null;
                this._http.get("http://localhost:8091/teachTime/MainApplication/rest/auth/"+token+"/users/"+id).toPromise()
                    .then((res: Response) => {
                        const json = res.json();
                        this._utente  = json;
                        resolve(this._utente);   
                    })
                    .catch(() => resolve(this._utente));
            
        });
    }

}
