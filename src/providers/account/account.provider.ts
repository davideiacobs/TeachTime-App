import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Events, LoadingController} from 'ionic-angular';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {UserSignupInterface} from '../../interfaces/user-signup.interface';
import {UserPersistanceInterface} from '../../interfaces/userpersistance.interface';
import {UserPersistanceProvider} from '../../providers/userpersistance/userpersistance.provider';
import {Sessione} from '../../models/sessione.model';
import {MY_URL_BASE} from '../../constants';


@Injectable()
export class AccountProvider {
  private _sessione: Sessione= null;
  private _sUserPersistance: UserPersistanceInterface;
  
    constructor(
        private _http: Http,
        public events: Events,
        public loadingCtrl: LoadingController,
        sUserPers: UserPersistanceProvider
    ) {
        this._sUserPersistance = sUserPers;
        this.initialize();
        this.isLogged();
    }
    
    
    initialize(): Promise<any> {
        return new Promise(resolve => {
            this._sUserPersistance.get()
                .then(sessione => {
                    this._sessione = sessione;
                    resolve();
                })
                .catch(() => resolve());
        });
    }
    
  registrati(user: UserSignupInterface): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.post(MY_URL_BASE+"users", user).toPromise()
                .then(() => {
                    resolve();
                })
                .catch((err: Response) => reject(`Errore status: ${err.status}`));
        });

    }

    login(utente : UserSignupInterface): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.post(MY_URL_BASE+"auth/login", utente).toPromise()
                .then((res: Response) => {
                    const json = res.json();
                    this._sUserPersistance.save(json);
                    //this.events.publish('user:login');
                    resolve();
                })
                .catch((err: Response) => reject(`Errore status: ${err.status}`));
        });
    }
    
    isLogged(): boolean {
        this.initialize();
        return this._sessione !== null;
    }
    
     logout(): Promise<any> { 
         return new Promise((resolve, reject) => {
            this.initialize().then(()=>{ 
                const loading = this.loadingCtrl.create({content: "Loading.." });
                loading.present();
                this._http.post(MY_URL_BASE +"auth/logout", this._sessione.token).toPromise()
                    .then(() => {
                        this._sUserPersistance.remove();
                        //this.events.publish('user:logout');
                        loading.dismiss();
                         resolve();
                    }).catch((err: Response) => reject(`Errore status: ${err.status}`));
            });
        });
    }


}