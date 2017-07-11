import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


import {UserSignupInterface} from '../../interfaces/user-signup.interface';


@Injectable()
export class AccountProvider {
    
  constructor(private _http: Http) {
    console.log('Hello AccountProvider Provider');
  }
  
  registrati(user: UserSignupInterface): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.post("http://localhost:8080/teachTime/MainApplication/rest/users", user).toPromise()
                .then((res: Response) => {
                    const json = res.json();
                    
                    /*if (json.result) {
                        resolve();
                    } else {
                        reject(json.message);
                    }*/
                })
                .catch((err: Response) => reject(`Errore status: ${err.status}`));
        });

    }


}