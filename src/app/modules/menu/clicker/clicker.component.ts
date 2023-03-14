import { Component } from '@angular/core';
import { pokemonDTO } from 'src/app/shared/models/pokemonDTO';
import { PokeService } from 'src/app/shared/services/pokeService/poke.service';

@Component({
  selector: 'app-clicker',
  templateUrl: './clicker.component.html',
  styleUrls: ['./clicker.component.scss']
})
export class ClickerComponent {
  pokemonLife : number;
  pokemonLifeMax : number;
  gameStarted = false;
  enemy! : pokemonDTO | undefined;
  timer : any;



  constructor(private _pokeService : PokeService){
    this.enemy = _pokeService.getPokemonDTOByOrder(1);

    console.log("this.enemy");
    console.log(this.enemy);
    let hp : number | undefined = this.enemy?.stats.find((stat) => stat.stat.name == "hp")?.base_stat;
    this.pokemonLifeMax = hp ? hp : 10;
    this.pokemonLife = this.pokemonLifeMax;
    console.log(this.enemy?.sprites.front_default);

  }

  decrementLife() {
    if (this.gameStarted && this.pokemonLife > 0) {
      this.pokemonLife--;
      if (this.pokemonLife === 0) {
        alert('Vous avez gagné!');
      }
    }
  }

  startGame() {
    this.gameStarted = true;
    //this.pokemonLife = 5;
    setInterval(() => {
      if (this.pokemonLife < this.pokemonLifeMax)
      this.pokemonLife++;
    }, 500);
  }

  getLifePercentage() {
    return (this.pokemonLife / 50) * 100; // 3 est le nombre de vies initiales
  }
}
