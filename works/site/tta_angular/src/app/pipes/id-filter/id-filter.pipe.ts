import { Pipe, PipeTransform } from '@angular/core';

export function idFilter<T extends { id: string }>(items: T[], id: string)
  : T | undefined {
  return items.find((item) => item.id === id)
}

@Pipe({
  name: 'idFilter',
  standalone: false
})
export class IdFilterPipe implements PipeTransform {

  transform<T extends { id: string }>(items: T[], id: string): T | undefined {
    return idFilter(items, id)
  }

}
