import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PointofwordPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'pointofword',
})
export class PointofwordPipe implements PipeTransform {
 transform(value:any) {
        if (value) {
            return value.charAt(0).toUpperCase()+".";
        }
        return value;
    }
}
