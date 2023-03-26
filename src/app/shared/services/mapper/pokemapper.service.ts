import { Injectable } from '@angular/core';
import { pokemonDTO } from '../../models/pokemonDTO';
import { pokemonForm } from '../../models/pokemonForm';

@Injectable({
  providedIn: 'root'
})
export class PokemapperService {

  constructor() { }

  dtoToForm(dto : pokemonDTO) : pokemonForm{
    console.log("order in mapper : "+dto.order)
    console.log("poke in mapper : ")
    console.log(dto)
    let tmp : any = dto as any;
    return new pokemonForm(dto['id'],
    dto.name,
    dto.stats.find( (s) => s.stat.name == 'hp' )!.base_stat,
    dto.stats.find( (s) => s.stat.name == 'attack' )!.base_stat,
    dto.stats.find( (s) => s.stat.name == 'defense' )!.base_stat,
    dto.stats.find( (s) => s.stat.name == 'speed' )!.base_stat,
    dto.stats.find( (s) => s.stat.name == 'special-attack' )!.base_stat,
    dto.stats.find( (s) => s.stat.name == 'special-defense' )!.base_stat,
    dto.sprites.front_default,
    dto.sprites.back_default,
    tmp['sprites']['other']['official-artwork']['front_default']
    );
  }
}
