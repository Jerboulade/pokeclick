import { Component, OnInit } from '@angular/core';
import { pokemonDTO } from 'src/app/shared/models/pokemonDTO';
import { PokeService } from 'src/app/shared/services/pokeService/poke.service';

@Component({
  selector: 'app-clicker',
  templateUrl: './clicker.component.html',
  styleUrls: ['./clicker.component.scss']
})
export class ClickerComponent implements OnInit{
  pokemonLife! : number;
  pokemonLifeMax! : number;
  gameStarted = false;
  enemy! : pokemonDTO;
  timer : any;
  errorMessage! : string;


  constructor(private _pokeService : PokeService) {
    this._pokeService.getPokemonDTOByOrder(1)?.subscribe({
      next : (data : pokemonDTO) => {
        this.enemy = data;
        console.log("GET " + this.enemy.name);
        console.log("this.enemy");
        console.log(this.enemy);
        let hp : number | undefined = this.enemy?.stats.find((stat) => stat.stat.name == "hp")?.base_stat;
        this.pokemonLifeMax = hp ? hp : 10;
        this.pokemonLife = this.pokemonLifeMax;
        console.log(this.enemy?.sprites.front_default);
      },
      error : (err : any) => {
        switch(err.status){
          case 0 : this.errorMessage = "Broken server"
          break;
          case 404 : this.errorMessage = "Pokemon not found"
          break;
        }
      }
    });;
   }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {

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
