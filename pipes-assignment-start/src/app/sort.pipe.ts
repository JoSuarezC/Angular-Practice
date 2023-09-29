import { Pipe, PipeTransform } from '@angular/core';

class Server {instanceType: string; name: string; status: string; started: Date};

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Server[]): Server[] {
    value.sort((a: Server, b: Server): number => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      if (aName < bName) {
        return -1;
      } 

      if (aName > bName ) {
        return 1;
      }

      return 0;
    })
    return value;
  }

}
