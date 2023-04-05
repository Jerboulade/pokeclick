import { Component, OnInit } from '@angular/core';
import { pokeListItem } from 'src/app/shared/models/pokeListItem';
import { PokeService } from 'src/app/shared/services/pokeService/poke.service';
import {forkJoin, Observable} from 'rxjs'
import { pokemonDTO } from 'src/app/shared/models/pokemonDTO';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit{

  pokeList : pokemonDTO[] = [];
  offset : number = 0;


  constructor(private _pokeService : PokeService){
    console.log("coucou");
  }

  ngOnInit(): void {
    this._pokeService.getPagination(10, this.offset).subscribe(items => this.handlePokemonPage(items))
  }


  expand() {
    this.offset += 10
    this._pokeService.getPagination(10, this.offset).subscribe(items => this.handlePokemonPage(items))
  }

  private handlePokemonPage(items: pokeListItem[]) {
    const obs: any = []
    items.forEach(it => obs.push(this._pokeService.getPokemon(it.url)))

    forkJoin<any[]>(obs).subscribe((data: any[]) => this.pokeList.push(...data));
  }
}
