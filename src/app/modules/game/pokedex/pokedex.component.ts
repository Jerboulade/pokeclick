import { Component } from '@angular/core';
import { pokeListItem } from 'src/app/shared/models/pokeListItem';
import { PokeService } from 'src/app/shared/services/pokeService/poke.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent {

  pokeList! : pokeListItem[];

  constructor(private _pokeService : PokeService){
    this.pokeList = _pokeService.getList;
  }
}
