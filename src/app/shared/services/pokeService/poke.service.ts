import { Injectable, OnInit } from '@angular/core';
import { MemoryCardService } from '../memory-card/memory-card.service';
import { HttpClient } from '@angular/common/http';
import { pokeListItem } from '../../models/pokeListItem';
import { pokemonForm } from '../../models/pokemonForm';
import { result } from '../../models/result';

@Injectable({
  providedIn: 'root'
})
export class PokeService{

  private pokeURL : string = "https://pokeapi.co/api/v2/"
  private pokeList : pokeListItem[] = [];

  constructor(private _http : HttpClient, private _serv : MemoryCardService) {
    console.log("init pokeservice");

    let i = 1;
    //let res : result;
    this._http.get<result>(this.pokeURL + "pokemon?limit=1010&offset=0").subscribe({
      next : (data : result) => {
        this.pokeList = data.results as pokeListItem[],
        //console.log("res");
        //console.log(this.pokeList);
        //console.log("coucou");

        this.pokeList.forEach(item => {
          item.order = i++;
          //onsole.log(item.order);
        })
        //console.log("coucou2");
        //console.log(this.pokeList);
        //console.log("coucou3");
      }
    });


    //console.log(this.pokeList[0]);

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

  postPokemonForm( token : string, form : pokemonForm ){
    this._serv.updatePokemon(token, form);
  }
}
