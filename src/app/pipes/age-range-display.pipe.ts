import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ageRangeDisplay'
})
export class AgeRangeDisplayPipe implements PipeTransform {

  transform(value: string): string {
    let ageRange : string = '';
    let age = Number(value);

    if(age >= 18 && age < 25) {
      ageRange = '25 - 18';
    }

    if(age >= 25 && age < 40) {
      ageRange = '40 - 25';
    }
    
    if(age >= 40 && age < 60) {
      ageRange = '60 - 40';
    }
    
    if(age >= 60 && age < 80) {
      ageRange = '80 - 60';
    }

    if(age >= 80 && age <= 99) {
      ageRange = '99 - 80';
    }

    return ageRange;
  }

}
