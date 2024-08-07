import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'championFilter',
  standalone: true
})
export class ChampionFilterPipe implements PipeTransform {

  transform(champions: any[], inputText) {
    return champions.filter(champion => {
      return champion.displayName.toLowerCase().includes(inputText.toLowerCase());
    })
  }

}
