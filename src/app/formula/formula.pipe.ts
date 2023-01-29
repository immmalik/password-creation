import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formula'
})
export class FormulaPipe implements PipeTransform {

  transform(name: any, rule: any): unknown {
    let result = '';
    if (rule.type == 'name') {
      if (rule.value.substr(0, 1) == '*') { // first of the string
        const digit = rule.value.substr(1);
        result = name.substr(0, digit);
      } else { // last of the string
        const digit = rule.value.substr(0, rule.value.length - 1);
        result = name.substr(name.length - digit);
      }
    }
    if (rule.type == 'input') {
      result = rule.value;
    }
    if (rule.type == 'length') {
      result = rule.value;
    }
    return result;
  }

  // transform(value: any): any {
  //   console.log(2);
  //   // return typeof value;
  //   if (
  //       typeof value === 'object' &&
  //       !Array.isArray(value) &&
  //       value !== null
  //     ) {
  //       return true;
  //     }
  //     return false;
  // }

}
