import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idToValue'
})
export class IdToValuePipe implements PipeTransform {

  transform(value: number, ...args: string[]): string {
    return args[value - 1];
  }

}
