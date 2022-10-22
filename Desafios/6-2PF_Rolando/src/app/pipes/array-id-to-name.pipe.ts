import { Pipe, PipeTransform } from '@angular/core';
import { Curso } from '../models/curso';

@Pipe({
  name: 'arrayIdToName'
})
export class ArrayIdToNamePipe implements PipeTransform {

  transform(value: number, args: Curso[]): string {
    return args[value-1].nombre;
  }

}
