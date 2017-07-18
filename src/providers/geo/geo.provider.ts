import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class GeoProvider {

  constructor(private _http: Http,
              public geolocation:Geolocation) {
    
  }
  
  
  geolocate(): Promise<string> {
        return new Promise((resolve) => {
            this.geolocation.getCurrentPosition().then((resp) => {
                var latlng : string = resp.coords.latitude + ","+ resp.coords.longitude;
                this._http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+latlng+'&key=AIzaSyBo3JM58EeyRu-7fvuVwXly5QNHeAiKVjA').toPromise().then((json : Response) =>{
                    var result = json.json();
                    var city:  Array <string> = (result.results[3].formatted_address).split(" ");
                    if (result.results.length >6){
                      resolve(city[1]);
                    }else{
                      if (city[1].includes("'")){
                          city[1]= city[1].substring(2,3).toUpperCase() + city[1].substring(4,city[1].length-1);
                          resolve(city[1]);
                      }else{
                        resolve(city[2]);
                      }
                    }
                    }).catch((error) => {
                        });
                    }).catch((error) => {
                     console.log('Error getting location', error);
                   });
            });
  }

}
