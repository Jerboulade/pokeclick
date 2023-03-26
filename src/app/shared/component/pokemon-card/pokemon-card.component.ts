import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { pokeListItem } from '../../models/pokeListItem';
import { PokeService } from '../../services/pokeService/poke.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit, OnChanges {
@Input()
pokemon! : pokeListItem;

constructor(private _pokeservice : PokeService, private _http : HttpClient){


}
  ngOnInit(): void {
    if (this.pokemon) {
      this._http.get<any>(this.pokemon.url).subscribe({
        next : (data) => {
          console.log(data);
          this.sprite_url = data.sprites.front_default as string
        }
      });
    }
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemon'] && !changes['pokemon'].firstChange) {
      this.ngOnInit();
    }
  }

sprite_url! : string;

get getSprite() {
  return this.sprite_url;
}
/*pokemon : pokemonDTO = {
  order : 0,
  name : "???",
  height : 0,
  weight : 0,
  base_experience : 1
};*/

}
