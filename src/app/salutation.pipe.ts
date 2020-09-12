import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salutation'
})
export class SalutationPipe implements PipeTransform {
  Male: string = 'Mr.';
  Female: string = 'Mrs.';
  transform(value: string, args?:any): any {

    if (args == "male") {

      return "Hello Mr." + value;

    } else {

      return "Hello Mrs." + value;

    }

  }

}
