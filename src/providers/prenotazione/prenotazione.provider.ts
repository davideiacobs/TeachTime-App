import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {MY_URL_BASE} from '../../constants';
import {Prenotazione} from '../../models/prenotazione.model';

@Injectable()
export class PrenotazioneProvider {

  constructor(private _http: Http) {
  }
  
  prenotati(prenotazione:Prenotazione, token:string): Promise<any> {
        console.log(prenotazione);
        console.log(token);
        return new Promise((resolve, reject) => {
            this._http.post(MY_URL_BASE + "auth/" + token + "/privateLessons/" + prenotazione.ripetizione_key.toString()+"/bookings" , prenotazione).toPromise()
                .then(() => {
                    resolve();
                })
                .catch((err: Response) => reject(`Errore status: ${err.status}`));
        });

    }   
}