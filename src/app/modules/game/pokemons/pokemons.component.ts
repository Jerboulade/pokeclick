import { Component } from '@angular/core';
import { pokeListItem } from 'src/app/shared/models/pokeListItem';
import { pokemonForm } from 'src/app/shared/models/pokemonForm';
import { LauncherService } from 'src/app/shared/services/launcher/launcher.service';
import { PokeService } from 'src/app/shared/services/pokeService/poke.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent {


  pokemons! : pokemonForm[] | undefined;
  poke : pokeListItem[] = []


  constructor( private _pokeService : PokeService, private _laucher : LauncherService) {
    this.pokemons = _pokeService.getUserPokemons(_laucher.getUserToken);
    for(let p of this.pokemons!){
      this.poke.push(this._pokeService.getListItemByOrder(p.order)!)
    }
    this.poke.push(this._pokeService.getListItemByOrder(150)!)

  }



}
