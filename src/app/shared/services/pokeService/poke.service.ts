import { Injectable, OnInit } from '@angular/core';
import { MemoryCardService } from '../memory-card/memory-card.service';
import { HttpClient } from '@angular/common/http';
import { pokeListItem } from '../../models/pokeListItem';
import { pokemonForm } from '../../models/pokemonForm';
import { pokemonDTO } from '../../models/pokemonDTO';
import { Observable } from 'rxjs';
import { Trainer } from '../../models/trainer';

@Injectable({
  providedIn: 'root'
})
export class PokeService{

  private pokeURL : string = "https://pokeapi.co/api/v2/"
  private pokeList : pokeListItem[] = [];
  private pokedex : pokemonDTO[] = []
  private errorMessage! : string;

  constructor(private _http : HttpClient, private _serv : MemoryCardService) {
    console.log("init pokeservice");
    console.log("GET pokelist ");
    let i = 1;
    this._http.get<any>(this.pokeURL + "pokemon?limit=650&offset=0").subscribe({
      next : (data) => {
        this.pokeList = data.results as pokeListItem[],
        //console.log("res");
        this.pokeList.forEach(item => {
          item.order = i++;
        })
      }
    });
    console.log(this.pokeList[0]);
   }



  get getList() : pokeListItem[] {
    return this.pokeList;
  }


  getListItemByOrder(order : number) : pokeListItem | undefined {
    // need auth info ?
    console.log("getlistitembyorder")
    //console.log(this.pokeList)
    console.log(this.pokeList.find(i => i.order == order))
    if (order == 0)
      order = 1;
    return this.pokeList.find(item => item.order == order);
  }

  getPokemonDTOByOrder(order : number) : pokemonDTO | Observable<pokemonDTO> | undefined {
    if ( order <= 0 || order > 650)
      return ;
    console.log("order in getPokemonDTOByOrder : "+ order);
    let pokemon : pokemonDTO | undefined = this.pokedex.find( pk => pk.order == order );
    if (!pokemon){
      //console.log("url in getPokemonDTOByOrder : "+ this.pokeURL + "pokemon/" + order);
      return this._http.get<pokemonDTO>(this.pokeURL + "pokemon/" + order)
    }
    else
      console.log("founded in pokedex")
    console.log(pokemon);
    return (pokemon);
  }

  postPokemonForm( token : string, form : pokemonForm ){
    this._serv.updatePokemon(token, form);
  }

  getUserPokemons(token : string) : pokemonForm[] {
    return this._serv.getUserPokemons(token);
  }

  updateActivePokemonByIndex(userToken : string, pokemonId : string, index : number) {
    this._serv.updateActivePokemonByIndex(userToken, pokemonId, index);
  }

  getUserActivePokemon(userToken : string) : pokemonForm[] {
     return this._serv.getUserActivePokemon(userToken);
  }
}
