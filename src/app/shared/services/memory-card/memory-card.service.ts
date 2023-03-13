import { Injectable } from '@angular/core';
import { Trainer } from '../../models/trainer';
import { pokemonForm } from '../../models/pokemonForm';

@Injectable({
  providedIn: 'root'
})
export class MemoryCardService {
//server

  server : Trainer[] = []

  constructor() { }
  createUser(form : any) : string{
    let user : Trainer = {
      id : (Math.random() * 10000).toString() as string,
      pseudo : form.pseudo as string,
      key : form.key as string,
      token : "bearer_",
      pokemons : []
    }
    user.token += user.id; // create/get? user token
    console.log("Server create token : " + user.token);
    return user.token;
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
}
