import { Component } from '@angular/core';
import { pipe } from 'rxjs';
import { pokeListItem } from 'src/app/shared/models/pokeListItem';
import { pokemonDTO } from 'src/app/shared/models/pokemonDTO';
import { pokemonForm } from 'src/app/shared/models/pokemonForm';
import { LauncherService } from 'src/app/shared/services/launcher/launcher.service';
import { PokemapperService } from 'src/app/shared/services/mapper/pokemapper.service';
import { MemoryCardService } from 'src/app/shared/services/memory-card/memory-card.service';
import { PokeService } from 'src/app/shared/services/pokeService/poke.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent {


  userPokemon : pokemonForm[] = [];
  pokeFormSelected! : pokemonForm;

  pokeFriendIds : string[] = [];
  pokeFriend : pokemonForm[] = [];
  friendIsSelected : boolean = false;
  friendIndexSelected : number = -1;

  poke : pokeListItem[] = []
  selectedPoke! : pokeListItem;
  trig : boolean = false;

 get getPokemonForm() : pokemonForm{
  return this.pokeFormSelected;
 }

  constructor( private _pokeService : PokeService, private _laucher : LauncherService, private _mapper : PokemapperService, private _serv :  MemoryCardService) {

    this.userPokemon = _pokeService.getUserPokemons(_laucher.getUserToken);
    this.pokeFriendIds = _laucher.getUser().activePokemons;
    this.pokeFriendIds.forEach(id => this.pokeFriend.push(this.userPokemon.find(poke => poke.getId == id)!))
    this.pokeFormSelected = this.userPokemon[0];
    this.trig = true;
  }

  get getPoke()
  {
    return this.poke;
  }

  select(pokemon : pokemonForm){
    this.pokeFormSelected = pokemon;
  }

  selectFriend(index : number) {
    if (!this.friendIsSelected) {
      this.friendIsSelected = true;
      this.friendIndexSelected = index;
    }
    else if (this.friendIsSelected && this.friendIndexSelected == index) {
      this.friendIsSelected = false;
      this.friendIndexSelected = -1;
    }
    else {
      this.friendIndexSelected = index;
    }
  }

  chooseFriend(id : string) {
    if (!this.pokeFriendIds.includes(id)) {
      this.pokeFriendIds[this.friendIndexSelected] = id;
      this.pokeFriend[this.friendIndexSelected] = this.userPokemon.find(p => p.getId == id)!;
      this._pokeService.updateActivePokemonByIndex(this._laucher.getUserToken, id, this.friendIndexSelected)
      this.friendIsSelected = false;
      this.friendIndexSelected = -1;

    }
  }

  isFriend(id : string) : boolean{
    return this.pokeFriendIds.includes(id)
  }

}
