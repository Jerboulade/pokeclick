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
    console.log("Mem Init");
  }
  ngOnInit(): void {
    console.log("Mem Destroy");
  }
  createUser(form : any) : string{
    let user : Trainer = {
      id : (Math.random() * 10000).toString() as string,
      pseudo : form.pseudo as string,
      key : form.key as string,
      token : "bearer_",
      pokemons : []
    }
    user.token += user.id; // create/get? user token
    this.server.push(user);
    console.log("Server create token : " + user.token);
    return user.token;
  }

  getUser(form : any) : string{
    let user = this.server.find(u => u.id == form.id && u.key == form.key)
    if (!user)
      return ("User not found");
    return user.token // create the token in API before
  }

  updatePokemon(userToken : string, pokemon : pokemonForm) : string{

    let user : Trainer | undefined =  this.server.find(user => user.token == userToken);
    if (user){
      let pokeToUp : pokemonForm | undefined = user.pokemons.find(p => p.order == pokemon.order)
      if (!pokeToUp)
        user.pokemons.push(pokemon);
      else{
        user.pokemons.splice(user.pokemons.indexOf(pokeToUp), 1, pokemon)
      }
      return "Pokemon updated";
    }
    return "User not found";
  }

  getAnyPokemonByUserId(token : string) : pokemonForm | undefined{
    let user = this.server.find(user => user.token == token);
    console.log(user);
    return user?.pokemons.find(p => p.order == 1 || p.order == 4 || p.order == 7);
  }

  getUserPokemons(token : string) : pokemonForm[] | undefined {
    let user = this.server.find(user => user.token == token);
    return user?.pokemons;
  }
}
