import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullNameDisplay'
})
export class FullNameDisplayPipe implements PipeTransform {

  transform(firstValue: string, secondValue : string): string {
    let combinedValue = `${firstValue} ${secondValue}`;
    return combinedValue;
  }

}
