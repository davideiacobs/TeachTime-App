import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {MY_URL_BASE} from '../../constants';
//models
import {Prenotazione} from '../../models/prenotazione.model';
import {Feedback} from '../../models/feedback.model';
//providers
import {UserPersistanceProvider} from '../../providers/userpersistance/userpersistance.provider';


@Injectable()
export class PrenotazioneProvider {

  constructor(private _http: Http, private sUserPersistance : UserPersistanceProvider) {
  }
  
  prenotati(prenotazione:Prenotazione, token:string): Promise<any> {

        return new Promise((resolve, reject) => {
            this._http.post(MY_URL_BASE + "auth/" + token + "/privateLessons/" + prenotazione.ripetizione_key.toString()+"/bookings" , prenotazione).toPromise()
                .then(() => {
                    resolve();
                })
                .catch();
        });

    }  
    
    
    recuperaFeedbacks() : Promise<any> {
        return new Promise((resolve) => {
            this.sUserPersistance.get().then(json => {                     
                var token = json["token"]; 
                var user_key = json["utente_key"];
                this._http.get(MY_URL_BASE+"auth/"+token+"/users/"+user_key+"/bookings").toPromise()
                    .then((res: Response) => {
                        const json = res.json();
                        resolve(json);

                    }).catch(() => {});
            }).catch(() => {});
        });
    } 
    
    
    
    inserisci(feedback : Prenotazione) : Promise<any> {
        return new Promise((resolve) => {
            this.sUserPersistance.get().then(json => {                     
                var token = json["token"];               
                var fb : Feedback = new Feedback(feedback);
                this._http.post(MY_URL_BASE + "auth/" + token + "/privateLessons/" + feedback.ripetizione_key + "/bookings/" + feedback.key +"/feedbacks", fb).toPromise()
                    .then((res: Response) => {
                        const json = res.json();
                        resolve(json);

                    }).catch(() => {});
            }).catch(() => {});
        });
    } 
    
}