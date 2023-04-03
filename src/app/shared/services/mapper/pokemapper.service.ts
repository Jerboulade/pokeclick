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

  addMethodToRawPokemon(pokemons : pokemonForm[]) {
    console.log(pokemons);

    pokemons.forEach((poke) => {
      Object.defineProperties(poke, {
        'getId': {
          get: function() { return this.id; }
        },
        'getXp': {
          get: function() { return this.xp; }
        },
        'level': {
          get: function() { let level =  this.xpTable.findIndex((elem : number) => elem >= this.xp)
            if (this.xp == this.xpTable[level])
              level++;
            return level; }
        },
        'setXp': {
          set: function(value: number) { if ( this.xp + value > 1250000 )
            this.xp = 1250000 - value;
          this.xp += value; }
        },
        'setEV_hp': {
          set: function(value: number) { this.hp_EV += value;
            if (this.hp_EV > 65535)
              this.hp_EV = 65535; }
        },
        'setEV_atk': {
          set: function(value: number) { this.atk_EV += value;
            if (this.atk_EV > 65535)
            this.atk_EV = 65535; }
        },
        'setEV_def': {
          set: function(value: number) { this.def_EV += value;
            if (this.def_EV > 65535)
            this.def_EV = 65535; }
        },
        'setEV_spd': {
          set: function(value: number) { this.spd_EV += value;
            if (this.spd_EV > 65535)
            this.spd_EV = 65535; }
        },
        'setEV_spec': {
          set: function(value: number) { this.spec_EV += value;
            if (this.spec_EV > 65535)
            this.spec_EV = 65535; }
        },
        'hp' : {
          get: function() { return this.statCalculation('hp', this.hp_base, this.hp_IV, this.hp_EV);  }
        },
        'atk' : {
          get: function() { return this.statCalculation('atk', this.atk_base, this.atk_IV, this.atk_EV);  }
        },
        'def' : {
          get: function() { return this.statCalculation('def', this.def_base, this.def_IV, this.def_EV);  }
        },
        'spd' : {
          get: function() { return this.statCalculation('spd', this.spd_base, this.spd_IV, this.spd_EV);  }
        },
        'spec_atk' : {
          get: function() { return this.statCalculation('spec_atk', this.specAtk_base, this.spec_IV, this.spec_EV);  }
        },
        'spec_def' : {
          get: function() { return this.statCalculation('spec_def', this.specDef_base, this.spec_IV, this.spec_EV);  }
        },
        'statCalculation': {
          value: function(name: string, base: number, iv: number, ev: number): number {
            return Math.floor((((base + iv) * 2 + Math.floor((Math.ceil(Math.sqrt(ev))) / 4)) * this.level) / 100) + (name == 'hp' ? this.level + 10 : 5);
          }
        }
      });
    })
  }
}
