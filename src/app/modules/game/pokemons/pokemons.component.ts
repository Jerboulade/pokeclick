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


  pokemons : pokemonForm[] | undefined = [];
  pokeFormSelected! : pokemonForm;
  poke : pokeListItem[] = []
  selectedPoke! : pokeListItem;
  trig : boolean = false;

 get getPokemonForm() : pokemonForm{
  return this.pokeFormSelected;
 }

 get getPokemons() {
  return this.pokemons;
 }

  constructor( private _pokeService : PokeService, private _laucher : LauncherService, private _mapper : PokemapperService, private _serv :  MemoryCardService) {
    // this.pokemons = _pokeService.getUserPokemons(_laucher.getUserToken);
    // for(let p of this.pokemons!){
    //   this.poke.push(this._pokeService.getListItemByOrder(p.order)!)
    // }
    let tests : number[] = [150, 1, 19, 42, 198, 740, 740];
    _serv.getUserPokemons(_laucher.getUserToken)?.forEach((p) => {
      this.pokemons?.push(p);
    })
    tests.forEach((order) => {
      // console.log(order + " in loop");
      _pokeService.getPokemonDTOByOrder(order)?.subscribe({
        next : (data : pokemonDTO) => {
          console.log(data);
          //this.player_sprite = data.sprites.front_default;
          this.pokemons?.push(_mapper.dtoToForm(data));
          if (this.pokemons?.length === 1){
            // console.log("coucou");
            // console.log(this.pokemons[0]);
            this.pokeFormSelected = this.pokemons[0];
          }
          // console.log(order + "order in sub");
          // console.log(data.order + "data order in sub");
          // console.log(_mapper.dtoToForm(data));
        }
      });
    })

    //this.poke.push(this._pokeService.getListItemByOrder(_serv.getAnyPokemonByUserId(_laucher.getUserToken)!.order)!)
    this.poke.push(this._pokeService.getListItemByOrder(150)!)
    this.poke.push(this._pokeService.getListItemByOrder(1)!)
    this.poke.push(this._pokeService.getListItemByOrder(19)!)
    this.poke.push(this._pokeService.getListItemByOrder(42)!)
    this.poke.push(this._pokeService.getListItemByOrder(198)!)
    this.poke.push(this._pokeService.getListItemByOrder(740)!)
    this.poke.push(this._pokeService.getListItemByOrder(740)!)
    this.trig = true;
  }

  get getPoke()
  {
    return this.poke;
  }

  select(pokemon : pokeListItem){
    console.log(pokemon);
    this.selectedPoke = pokemon;
    this.pokeFormSelected = this.pokemons![(this.poke.indexOf(pokemon))];
  }
}
