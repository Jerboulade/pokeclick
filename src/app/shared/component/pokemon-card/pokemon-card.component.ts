import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { pokeListItem } from '../../models/pokeListItem';
import { pokemonDTO } from '../../models/pokemonDTO';
import { PokeService } from '../../services/pokeService/poke.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {

constructor(private _pokeservice : PokeService, private _http : HttpClient){
    this._http.get<any>(this.pokemon.url).subscribe({
      next : (data) => {
        this.sprite_url = data.sprites.front_default as string
      }
    });

}

@Input()
pokemon : pokeListItem = {
  order : 0,
  name: '???',
  url : "void"
}

sprite_url! : string;
/*pokemon : pokemonDTO = {
  order : 0,
  name : "???",
  height : 0,
  weight : 0,
  base_experience : 1
};*/

}
