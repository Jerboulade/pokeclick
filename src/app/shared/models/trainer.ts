import { pokemonForm } from "./pokemonForm";
import { pokemonDTO } from "./pokemonDTO";

export interface Trainer {
  id : string,
  pseudo : string,
  key : string,
  token : string,
  pokemons : pokemonForm[],
}
