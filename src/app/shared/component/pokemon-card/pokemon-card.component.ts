import { Component, Input } from '@angular/core';
import { pokeListItem } from '../../models/pokeListItem';
import { pokemonDTO } from '../../models/pokemonDTO';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {

@Input()
pokemon : pokeListItem = {
  order : 0,
  name: '???',
  url : "void"
}
/*pokemon : pokemonDTO = {
  order : 0,
  name : "???",
  height : 0,
  weight : 0,
  base_experience : 1
};*/

}
