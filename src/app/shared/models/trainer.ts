import { pokemonForm } from "./pokemonForm";
import { pokemonDTO } from "./pokemonDTO";

export interface Trainer {
  id : string,
  pseudo : string,
  gender : string,
  key : string,
  token : string,
  pokemons : pokemonForm[],
  activePokemons : string[],
  clic : number;
  pokeball : number;
}
