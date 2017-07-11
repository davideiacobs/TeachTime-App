import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Events} from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {UserSignupInterface} from '../../interfaces/user-signup.interface';
import {UserPersistanceInterface} from '../../interfaces/userpersistance.interface';
import {UserPersistanceProvider} from '../../providers/userpersistance/userpersistance.provider';
import {Utente} from '../../models/utente.model';
@Injectable()
export class AccountProvider {
  private _user: Utente = null;
  private _sUserPersistance: UserPersistanceInterface;
    constructor(
        private _http: Http,
        public events: Events,
        sUserPers: UserPersistanceProvider
    ) {
        console.log('Hello Account Provider');
        this._sUserPersistance = sUserPers;
    }
    initialize(): Promise<any> {
        return new Promise(resolve => {
            this._sUserPersistance.get()
                .then(user => {
                    this._user = user;
                    resolve();
                })
                .catch(() => resolve());
        });
    }
    
  registrati(user: UserSignupInterface): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.post("http://localhost:8091/teachTime/MainApplication/rest/users", user).toPromise()
                .then(() => {
                    resolve();
                })
                .catch((err: Response) => reject(`Errore status: ${err.status}`));
        });

    }

    login(utente : UserSignupInterface): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.post("http://localhost:8091/teachTime/MainApplication/rest/auth/login", utente).toPromise()
                .then((res: Response) => {
                    const json = res.json();
                    this._sUserPersistance.save(json);
                    //this.events.publish('user:login');
                    
                })
                .catch((err: Response) => reject(`Errore status: ${err.status}`));
        });
    }


}