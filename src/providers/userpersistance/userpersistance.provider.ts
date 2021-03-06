import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

//Interface
import {UserPersistanceInterface} from '../../interfaces/userpersistance.interface';


//Constants
import {STORAGE_KEYS} from '../../constants';

@Injectable()
export class UserPersistanceProvider implements UserPersistanceInterface {

    constructor(private _storage: Storage) {

    }
    
    save(user: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._storage.set(STORAGE_KEYS.USER, user)
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
            this._storage.get(STORAGE_KEYS.USER)
                .then((user) => {
                    if (user !== null) {
                        resolve(user);
                    } else {
                        reject();
                    }
                })
        });
    }
    
    remove(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._storage.remove(STORAGE_KEYS.USER)
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    reject();
                })
        });
    }

}
