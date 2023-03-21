import { Component, ComponentFactoryResolver, Inject, OnInit, Renderer2, RendererFactory2, ViewChild, ViewContainerRef } from '@angular/core';
import { pokemonDTO } from 'src/app/shared/models/pokemonDTO';
import { pokemonForm } from 'src/app/shared/models/pokemonForm';
import { PokemapperService } from 'src/app/shared/services/mapper/pokemapper.service';
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
  player! : pokemonForm;
  enemy! : pokemonForm;
  pokeEnemy! : pokemonDTO;
  player_sprite! : string;
  enemy_sprite! : string;
  fightStart : boolean = false;

  constructor( private _pokeService : PokeService, private _pokeMapper : PokemapperService ){}

  getPokePlayer(){
    if (this.pokePlayerIndex > 0 && this.pokePlayerIndex < 1000)
      this._pokeService.getPokemonDTOByOrder(this.pokePlayerIndex)?.subscribe({
        next : (data : pokemonDTO) => {
          //this.player_sprite = data.sprites.front_default;
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
  fight(){
    this.player = this._pokeMapper.dtoToForm(this.pokePlayer);
    this.enemy = this._pokeMapper.dtoToForm(this.pokeEnemy);

    // this.enemy.setXp = 1250000;
    // this.enemy.setEV_hp  = 65535;
    // this.enemy.setEV_def = 65535;
    // this.enemy.setEV_spd = 65535;
    // this.enemy.setEV_atk = 65535;

    // this.player.setXp = 1250000;
    // this.player.setEV_hp  = 65535;
    // this.player.setEV_def = 65535;
    // this.player.setEV_spd = 65535;
    // this.player.setEV_atk = 65535;

    console.log(this.player)
    console.log(this.enemy)
    console.log(this.pokePlayer.sprites.front_default)
    console.log(this.pokeEnemy.sprites.front_default)
    this.fightStart = true;

  }
}
