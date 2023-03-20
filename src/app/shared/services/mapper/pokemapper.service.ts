import { Injectable } from '@angular/core';
import { pokemonDTO } from '../../models/pokemonDTO';
import { pokemonForm } from '../../models/pokemonForm';

@Injectable({
  providedIn: 'root'
})
export class PokemapperService {

  constructor() { }

  dtoToForm(dto : pokemonDTO) : pokemonForm{
    return new pokemonForm(dto.order,
    dto.stats.find( (s) => s.stat.name == 'hp' )!.base_stat,
    dto.stats.find( (s) => s.stat.name == 'attack' )!.base_stat,
    dto.stats.find( (s) => s.stat.name == 'defense' )!.base_stat,
    dto.stats.find( (s) => s.stat.name == 'speed' )!.base_stat,
    dto.stats.find( (s) => s.stat.name == 'special-attack' )!.base_stat,
    dto.stats.find( (s) => s.stat.name == 'special-defense' )!.base_stat
    );
  }
}
