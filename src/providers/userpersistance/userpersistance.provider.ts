import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

//Interface
import {UserPersistanceInterface} from '../../interfaces/userpersistance.interface';


//Constants
import {STORAGE_KEYS} from '../../constants';

@Injectable()
export class UserPersistanceProvider implements UserPersistanceInterface {

    constructor(private _storage: Storage) {
        console.log('Hello UserPersistance Provider');
    }
    
    save(user: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._storage.set(STORAGE_KEYS.TOKEN, user)
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    reject();
                });
        });
    }
    
    get(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._storage.get(STORAGE_KEYS.TOKEN)
                .then((user) => {
                    if (user !== null) {
                        console.log(user);
                        resolve(user);
                    } else {
                        reject();
                    }
                })
        });
    }
    
    remove(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._storage.remove(STORAGE_KEYS.TOKEN)
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    reject();
                })
        });
    }

}
