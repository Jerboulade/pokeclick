import { Component, Input, OnInit } from '@angular/core';
import { pokemonDTO } from 'src/app/shared/models/pokemonDTO';
import { pokemonForm } from 'src/app/shared/models/pokemonForm';
import { LauncherService } from 'src/app/shared/services/launcher/launcher.service';
import { PokemapperService } from 'src/app/shared/services/mapper/pokemapper.service';
import { MemoryCardService } from 'src/app/shared/services/memory-card/memory-card.service';
import { PokeService } from 'src/app/shared/services/pokeService/poke.service';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.scss']
})
export class FightComponent {

poke! : pokemonForm;
poke2! : pokemonForm;
randomPokeList : pokemonForm[] = []
clicInParent : number = 0;
fightResult : string = "";

constructor(private _pokeService : PokeService, private _serv : MemoryCardService, private _mapper : PokemapperService, private _launcher : LauncherService){

  _pokeService.getPokemonDTOByOrder(3)?.subscribe({
    next : (data : pokemonDTO) => {
      this.poke = _mapper.dtoToForm(data);
    }
  })
  _pokeService.getPokemonDTOByOrder(6)?.subscribe({
    next : (data : pokemonDTO) => {
      this.poke2 = _mapper.dtoToForm(data);
    }
  })

  setInterval(() => {
    if (this.randomPokeList.length < 3){
      let rand : number = Math.ceil(Math.random() * 1000);
    console.log(rand);
    _pokeService.getPokemonDTOByOrder(rand)?.subscribe({
      next : (data : pokemonDTO) => {
        this.randomPokeList.push(_mapper.dtoToForm(data));
      }
    })
    }
  }, 10000);

}

endFightResult(event : any){
  this.fightResult = event;
  if (this.fightResult == "win" && this.randomPokeList.find(i => i == this.poke2))
    this.randomPokeList.splice(this.randomPokeList.indexOf(this.poke2), 1);
  else if (this.fightResult == "catch"){
    this._pokeService.postPokemonForm(this._launcher.getUserToken, this.poke2)
    this.randomPokeList.splice(this.randomPokeList.indexOf(this.poke2), 1);
  }
  //this.poke2 = {} as any;
}

onChildClick(event: any) {
  this.clicInParent = event;
}
  clickEnemy(enemy : pokemonForm) {
    this.poke2 = enemy;
  }
}
