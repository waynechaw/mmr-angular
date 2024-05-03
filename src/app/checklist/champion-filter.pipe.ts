import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'championFilter',
  standalone: true
})
export class ChampionFilterPipe implements PipeTransform {

  transform(champions: any[], inputText, lane) {
    return champions.filter(champion => {
      return champion.id.toLowerCase().includes(inputText.toLowerCase());
    }).filter(champion => {
      if (!lane) {
        return true;
      }
      return champion.lanes.includes(lane);
    });
  }

}
