import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreCompleto'
})
export class NombreCompletoPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    return `${args[1]}, ${args[0]}`;
  }

}
