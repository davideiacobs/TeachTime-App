import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Utente} from '../../models/utente.model';

/*
  Generated class for the UtenteProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UtenteProvider {

  constructor(private _http: Http) {
    console.log('Hello UtenteProvider Provider');
  }
  
  
    /**
     * Recupera il voto dell'utente dal server.
     */
    getVoto(utente:Utente): Promise<number> {
        return new Promise((resolve) => {
                utente.voto = 0;
                
                this._http.get("http://localhost:8091/teachTime/MainApplication/rest/users/"+utente.key+"/feedbacks/avg").toPromise()
                    .then((res: Response) => {
                        const json = res.json();
                        resolve(json);
                        
                    })
                    .catch(() => resolve(utente.voto));
            
        });
    }

}
