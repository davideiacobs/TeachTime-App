import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {MY_URL_BASE} from '../../constants';
//models
import {Utente} from '../../models/utente.model';
import { Ripetizione } from '../../models/ripetizione.model';

@Injectable()
export class UtenteProvider {
  
  private _ripetizioni: Array<Ripetizione> = null;
     
  constructor(private _http: Http) {
      
  }
  
    /**
     * Recupera il voto dell'utente dal server.
     */
    getVoto(utente:Utente): Promise<number> {
        return new Promise((resolve) => {
                utente.voto = 0;
                this._http.get(MY_URL_BASE+"users/"+utente.key+"/feedbacks/avg").toPromise()
                    .then((res: Response) => {
                        const json = res.json();
                        resolve(json);
                        
                    })
                    .catch(() => resolve(utente.voto));
            
        });
    }

   getFeedback(utente:Utente): Promise<any> {
        return new Promise((resolve) => {
                this._http.get(MY_URL_BASE+"users/"+utente.key+"/feedbacks").toPromise()
                    .then((res: Response) => {
                        const json = res.json();
                        resolve(json);
                        
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
    
    updateUtente(id : number, token:string,utente : Utente): Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
       
        return new Promise((resolve) => {
            alert(utente.imgProfilo);
                this._http.put(MY_URL_BASE+"auth/"+token+"/users/"+id,utente,headers).toPromise()
                    .then((res: Response) => {
                        resolve(res);   
                        
                    })
                    .catch(() => resolve());         
        });
    }

    getRipetizioni(token:string): Promise<Array<Ripetizione>> {
        return new Promise((resolve) => {
           
                this._ripetizioni = [];
                console.log(token);
                this._http.get(MY_URL_BASE+"auth/"+token+"/privateLessons/my").toPromise()
                    .then((res: Response) => {
                        const json = res.json();
                            this._ripetizioni=json;
                            console.log("sgsdgsdggs");
                          console.log(this._ripetizioni);
                        resolve(this._ripetizioni);
                        
                    })
                    .catch(() => resolve(this._ripetizioni));
        });
    }

}
