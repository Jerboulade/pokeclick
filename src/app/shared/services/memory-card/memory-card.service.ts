import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Trainer } from '../../models/trainer';
import { pokemonForm } from '../../models/pokemonForm';

@Injectable({
  providedIn: 'root'
})
export class MemoryCardService implements OnInit, OnDestroy {
//server

  server : Trainer[] = []

  constructor() { }
  ngOnDestroy(): void {
    console.log("Mem Destroy");
  }
  ngOnInit(): void {
    console.log("Mem Init");
  }
  createUser(form : any) : string{
    let user : Trainer = {
      id : (Math.random() * 10000).toString() as string,
      pseudo : form.pseudo as string,
      key : form.key as string,
      token : "bearer_",
      pokemons : [] as pokemonForm[],
      activePokemons : [] as pokemonForm[],
    }
    user.token += user.id; // create/get? user token
    this.server.push(user);
    console.log("Server create token : " + user.token);
    localStorage.setItem('user', JSON.stringify(user)) // TEST LOCAL STORAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    return user.token;
  }

  getUser(form : any) : string {
    let user : Trainer | undefined = this.server.find(u => u.id == form.id && u.key == form.key)
    if (!user){
      user = JSON.parse(localStorage.getItem('user')!);  // TEST LOCAL STORAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      if (!user)
        return ("User not found");
    }
    return user.token // create the token in API before
  }

  updatePokemon(userToken : string, pokemon : pokemonForm) : string{

    let user : Trainer | undefined =  this.server.find(user => user.token == userToken);
    if (!user)
      user = JSON.parse(localStorage.getItem('user')!);  // TEST LOCAL STORAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (user){
      let pokeToUp : pokemonForm | undefined = user.pokemons.find(p => p.getId == pokemon.getId)
      if (!pokeToUp)
        user.pokemons.push(pokemon);
      else{
        user.pokemons.splice(user.pokemons.indexOf(pokeToUp), 1, pokemon)
      }
      localStorage.removeItem('user') // TEST LOCAL STORAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      localStorage.setItem('user', JSON.stringify(user)) // TEST LOCAL STORAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      return "Pokemon updated";
    }
    return "User not found";
  }

  getAnyPokemonByUserId(token : string) : pokemonForm | undefined{
    let user : Trainer | undefined = this.server.find(user => user.token == token);
    if (!user)
      user = JSON.parse(localStorage.getItem('user')!);  // TEST LOCAL STORAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log(user);
    return user?.pokemons.find(p => p.order == 1 || p.order == 4 || p.order == 7);
  }



  getUserPokemons(token : string) : pokemonForm[] | undefined {
    let user : Trainer | undefined = this.server.find(user => user.token == token);
    if (!user){
      user = JSON.parse(localStorage.getItem('user')!);  // TEST LOCAL STORAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      console.log(user?.pokemons);
      user?.pokemons.forEach((poke) => {
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
    return user?.pokemons;

  }
}
