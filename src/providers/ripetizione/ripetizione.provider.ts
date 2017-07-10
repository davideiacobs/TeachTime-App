import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//Models 
import {Ripetizione} from '../../models/ripetizione.model';

@Injectable()
export class RipetizioneProvider {

  private _ripetizioni: Array<Ripetizione> = null;
  
  constructor( private _http: Http) {
    
  }
  
  
   /**
     * Recupera le ripetizioni dal server.
     */
    getRipetizioni(categoria:number, materia:number, città:string): Promise<Array<Ripetizione>> {
        return new Promise((resolve) => {
           
                this._ripetizioni = [];
                
                this._http.get("http://localhost:8080/teachTime/MainApplication/rest/privateLessons?city="+città+"&category="+categoria+"&subject="+materia).toPromise()
                    .then((res: Response) => {
                        const json = res.json();
                        for (let ripetizione of json) {
                            this._ripetizioni.push(new Ripetizione(ripetizione));
                        }  
                           
                        resolve(this._ripetizioni);
                        
                    })
                    .catch(() => resolve(this._ripetizioni));
            
        });
    }

}
