import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comaDecimal'
})
export class ComaDecimalPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): string {
    return (value)? '<span><mat-icon>check_circle</mat-icon></span>': '<span><mat-icon>cancel</mat-icon></span>';
  }

}
