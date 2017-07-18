import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {MY_URL_BASE} from '../../constants';
//Models 
import {Ripetizione} from '../../models/ripetizione.model';
//providers
import {AccountProvider} from '../../providers/account/account.provider';
import {UserPersistanceProvider} from '../../providers/userpersistance/userpersistance.provider';

@Injectable()
export class RipetizioneProvider {

  private _ripetizioni: Array<Ripetizione> = null;
  
  constructor( private _http: Http, 
               private sAccount : AccountProvider, 
               private sUserPersistance : UserPersistanceProvider) {
        
  }
  
   addRipetizione(ripetizione:Ripetizione): Promise<any> {
       return new Promise((resolve, reject) => {
           console.log(ripetizione);
           if(this.sAccount.isLogged()){
               this.sUserPersistance.get().then(json => {
                  var token = json["token"];
                  this._http.post(MY_URL_BASE+"auth/"+token+"/privateLessons", ripetizione).toPromise().then((res:Response) => {
                      resolve();
                  }).catch(() => reject()); 
               }).catch(() => {});
           } 
       });       
   }
   
   
   
   updRipetizione(ripetizione:Ripetizione): Promise<any> {
       return new Promise((resolve, reject) => {
           console.log(ripetizione);
           if(this.sAccount.isLogged()){
               this.sUserPersistance.get().then(json => {
                  var token = json["token"];
                   let headers = new Headers();
                   headers.append('Content-Type', 'application/json'); 
                  this._http.put(MY_URL_BASE+"auth/"+token+"/privateLessons/"+ripetizione.key, ripetizione, headers).toPromise().then((res:Response) => {
                      resolve();
                  }).catch(() => reject()); 
               }).catch(() => {});
           } 
       });       
   }
   
   /**
     * Recupera le ripetizioni dal server.
     */
    getRipetizioni(categoria:number, materia:number, città:string): Promise<Array<Ripetizione>> {
        return new Promise((resolve) => {
           
                this._ripetizioni = [];
                if (this.sAccount.isLogged()){
                    this.sUserPersistance.get().then(json => {                     
                        var token = json["token"]; 
                         this._http.get(MY_URL_BASE+"auth/"+token+"/privateLessons?city="+città+"&category="+categoria+"&subject="+materia).toPromise()
                        .then((res: Response) => {
                            const json = res.json();
                            for (let ripetizione of json) {
                                this._ripetizioni.push(new Ripetizione(ripetizione));
                            }  

                            resolve(this._ripetizioni);

                        })
                        .catch(() => resolve(this._ripetizioni));
                    }).catch(() => {});

                }else{
                    this._http.get(MY_URL_BASE+"privateLessons?city="+città+"&category="+categoria+"&subject="+materia).toPromise()
                        .then((res: Response) => {
                            const json = res.json();
                            for (let ripetizione of json) {
                                this._ripetizioni.push(new Ripetizione(ripetizione));
                            }  

                            resolve(this._ripetizioni);

                        })
                        .catch(() => resolve(this._ripetizioni));
                }
        });
    }

}
