import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter1'
})


export class Filter1Pipe implements PipeTransform {

  // searchText: string = ''

  transform(value: any[], searchText: string, propName: string): any[] {
    const result: any = []
    if (!value || searchText === '' || propName === '') {
      return value;
    }
    value.forEach((a: any) => {
      if (a[propName].trim().toLowerCase().includes(searchText.toLowerCase())) {
        result.push(a);
      }
    });
    return result;
  }

}
