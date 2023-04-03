import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Trainer } from '../../models/trainer';
import { pokemonForm } from '../../models/pokemonForm';
import { PokemapperService } from '../mapper/pokemapper.service';

@Injectable({
  providedIn: 'root'
})
export class MemoryCardService implements OnInit, OnDestroy {

  /* This servive simulate the server side by storing data in localStorage */

  constructor(private _mapper : PokemapperService) {}

  ngOnDestroy(): void {
    console.log("Mem Destroy");
  }

  ngOnInit(): void {
    console.log("Mem Init");
  }

  createUser(form : any) : string{
    let user : Trainer = {
      id : (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)+"-"+ (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)+"-"+ (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
      pseudo : form.pseudo as string,
      gender : form.gender as string,
      key : form.key as string,
      token : "bearer_",
      pokemons : [] as pokemonForm[],
      activePokemons : [] as string[],
      clic : 0,
      pokeball : 0
    }
    user.token += user.id; // create/get? user token
    console.log("Server create token : " + user.token);
    localStorage.setItem('user', JSON.stringify(user))
    return user.token;
  }

  getUserToken(form : any) : string {
    let user = JSON.parse(localStorage.getItem('user')!);
    if (!user)
      return ("User not found");
    return user.token // create the token in API before
  }

  getUser() : Trainer {
    let user : Trainer = JSON.parse(localStorage.getItem('user')!);
    return user; // create the token in API before
  }

  updateUser(user : Trainer) {
    localStorage.removeItem('user')
    localStorage.setItem('user', JSON.stringify(user))
  }

  updateActivePokemonByIndex(userToken : string, pokemonId : string, index : number) {
    let user : Trainer = this.getUser();
    // if (!user) --> redirect to signup;
    user.activePokemons.splice(index, 1, pokemonId);
    this.updateUser(user);
  }

  updatePokemon(userToken : string, pokemon : pokemonForm){
    let user = this.getUser();
    this._mapper.addMethodToRawPokemon(user.pokemons);
    let pokeToUp : pokemonForm | undefined = user.pokemons.find((p : pokemonForm) => p.getId == pokemon.getId)
    if (!pokeToUp)
      user.pokemons.push(pokemon);
    else
      user.pokemons.splice(user.pokemons.indexOf(pokeToUp), 1, pokemon)
    this.updateUser(user);
  }

  getUserActivePokemon(token : string) : pokemonForm[] {
    let user = this.getUser();
    let activePokemons : pokemonForm[] = [];
    this._mapper.addMethodToRawPokemon(user.pokemons);
    user.activePokemons.forEach(id => activePokemons.push(user.pokemons.find(poke => poke.getId == id)!))
    return activePokemons;
  }

  getUserPokemons(token : string) : pokemonForm[] {
    let user = this.getUser();
    this._mapper.addMethodToRawPokemon(user.pokemons)
    return user.pokemons;
  }

  emptyLocalStorage() {
    localStorage.clear();
  }

  getDataToString() : string {
    return (this.encrypt(JSON.stringify(localStorage.getItem('user')!)))
  }

  encrypt(message: string): string {
    let result = '';

    for (let i = 0; i < message.length; i++) {
      const ascii = message.charCodeAt(i);
      let base6 = ascii.toString(6);
      while (base6.length < 3) {
        base6 = '0' + base6;
      }
      for (let j = 0; j < base6.length; j++) {
        const digit = Number.parseInt(base6.charAt(j), 6);
        switch (digit) {
          case 0:
            result += '>';
            break;
          case 1:
            result += '<';
            break;
          case 2:
            result += '+';
            break;
          case 3:
            result += '-';
            break;
          case 4:
            result += '[';
            break;
          case 5:
            result += ']';
            break;
        }
      }
    }
    return result;
  }

  decrypt(message: string): string {
    let result = '';
    const groups = message.match(/.{1,3}/g) ?? [];
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      let base6 = '';
      for (let j = 0; j < group.length; j++) {
        const char = group.charAt(j);
        switch (char) {
          case '>':
            base6 += '0';
            break;
          case '<':
            base6 += '1';
            break;
          case '+':
            base6 += '2';
            break;
          case '-':
            base6 += '3';
            break;
          case '[':
            base6 += '4';
            break;
          case ']':
            base6 += '5';
            break;
        }
      }
      const ascii = parseInt(base6, 6);
      result += String.fromCharCode(ascii);
    }
    return result;
  }
}
