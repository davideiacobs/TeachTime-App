import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {MY_URL_BASE} from '../../constants';
//models
import {Utente} from '../../models/utente.model';


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
                console.log(utente);
                utente.voto = 0;
                this._http.get(MY_URL_BASE+"users/"+utente.key+"/feedbacks/avg").toPromise()
                    .then((res: Response) => {
                        const json = res.json();
                        resolve(json);
                        console.log(json);
                        
                    })
                    .catch(() => resolve(utente.voto));
            
        });
    }

   getFeedback(utente:Utente): Promise<number> {
        return new Promise((resolve) => {
                this._http.get(MY_URL_BASE+"users/"+utente.key+"/feedbacks").toPromise()
                    .then((res: Response) => {
                        const json = res.json();
                        resolve(json);
                        console.log(json);
                        
                    })
                    .catch(() => resolve());
        });
    }
    
    getUtente(id : number, token:string): Promise<Utente> {
        return new Promise((resolve) => {
                this._http.get(MY_URL_BASE+"auth/"+token+"/users/"+id).toPromise()
                    .then((res: Response) => {
                        const json = res.json();
                        resolve(json);   
                    })
                    .catch(() => resolve());
            
        });
    }

}
