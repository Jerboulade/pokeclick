import { Component, ComponentFactoryResolver, Inject, OnInit, Renderer2, RendererFactory2, ViewChild, ViewContainerRef } from '@angular/core';
import { pokemonDTO } from 'src/app/shared/models/pokemonDTO';
import { PokeService } from 'src/app/shared/services/pokeService/poke.service';
import { PopService } from 'src/app/shared/services/popService/pop.service';

@Component({
  selector: 'app-clicker',
  templateUrl: './clicker.component.html',
  styleUrls: ['./clicker.component.scss'],
})
export class ClickerComponent {

  pokePlayerIndex : number = 0;
  pokeEnemyIndex : number = 0;
  errorMessage! : string;
  pokePlayer! : pokemonDTO;
  pokeEnemy! : pokemonDTO;

  getPokePlayer(){
    if (this.pokePlayerIndex > 0 && this.pokePlayerIndex < 1000)
      this._pokeService.getPokemonDTOByOrder(this.pokePlayerIndex)?.subscribe({
        next : (data : pokemonDTO) => {
          this.pokePlayer = data;
        },
        error : (err : any) => {
          switch(err.status){
            case 0 : this.errorMessage = "Broken server"
            break;
            case 404 : this.errorMessage = "Pokemon not found"
            break;
          }
        }
      })
  }

  getPokeEnemy() {
    if (this.pokeEnemyIndex > 0 && this.pokeEnemyIndex < 1000)
      this._pokeService.getPokemonDTOByOrder(this.pokeEnemyIndex)?.subscribe({
        next : (data : pokemonDTO) => {
          this.pokeEnemy = data;
        },
        error : (err : any) => {
          switch(err.status){
            case 0 : this.errorMessage = "Broken server"
            break;
            case 404 : this.errorMessage = "Pokemon not found"
            break;
          }
        }
      })
  }

  constructor( private _pokeService : PokeService, private _popService : PopService ){}

   fight() {

   }
}
