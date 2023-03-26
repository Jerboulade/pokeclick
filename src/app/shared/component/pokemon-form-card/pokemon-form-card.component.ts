import { Component, Input } from '@angular/core';
import { pokemonForm } from '../../models/pokemonForm';

@Component({
  selector: 'app-pokemon-form-card',
  templateUrl: './pokemon-form-card.component.html',
  styleUrls: ['./pokemon-form-card.component.scss']
})
export class PokemonFormCardComponent {

  @Input()
  pokemon! : pokemonForm;

  get getPokemon() {
    return this.pokemon;
  }

  constructor() {
    console.log("informcard------------------------------")

    console.log(this.pokemon)
  }

}
