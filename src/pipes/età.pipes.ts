import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
/**
 * Generated class for the EtàPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'età',
})
export class EtàPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: Date|moment.Moment, args: string[]): any {

  	if (!value) return value;

		return moment().diff(value, 'years')+" Anni";
  	
  }
  
}