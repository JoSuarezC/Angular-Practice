import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs-compat/operator/filter';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, category: string): unknown {
    if (value.length === 0 || filterString === '') 
      return value
    
    const results = [];
    for (const item of value) {
      if (item[category] === filterString) {

        results.push(item);
      }
    }

    return results;
  }

}
