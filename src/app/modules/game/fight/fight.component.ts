import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { pokemonDTO } from 'src/app/shared/models/pokemonDTO';
import { pokemonForm } from 'src/app/shared/models/pokemonForm';
import { Trainer } from 'src/app/shared/models/trainer';
import { LauncherService } from 'src/app/shared/services/launcher/launcher.service';
import { PokemapperService } from 'src/app/shared/services/mapper/pokemapper.service';
import { MemoryCardService } from 'src/app/shared/services/memory-card/memory-card.service';
import { PokeService } from 'src/app/shared/services/pokeService/poke.service';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.scss']
})
export class FightComponent implements OnDestroy {

poke! : pokemonForm;
poke2! : pokemonForm;
randomPokeList : pokemonForm[] = [];
userPokemons : pokemonForm[] = [];
clicInParent : number = 0;
fightResult : string = "";
randomTimer : any;

constructor(private _pokeService : PokeService, private _mapper : PokemapperService, private _launcher : LauncherService){

  this.userPokemons = _pokeService.getUserActivePokemon(_launcher.getUserToken)!
  this.poke = this.userPokemons[0];

  _pokeService.getPokemonDTOByOrder(Math.ceil(Math.random() * 650))?.subscribe({
    next : (data : pokemonDTO | undefined) => {
      if (!data) return;
      this.poke2 = _mapper.dtoToForm(data);
      this.randomPokeList.push(this.poke2);

    }
  })

  this.randomTimer = setInterval(() => {
    if (this.randomPokeList.length < 3){
      let rand : number = Math.ceil(Math.random() * 650);
    console.log(rand);
    _pokeService.getPokemonDTOByOrder(rand).subscribe({
      next : (data : pokemonDTO | undefined) => {
        if (!data) return;
        this.randomPokeList.push(_mapper.dtoToForm(data));
      }
    })
    }
  }, 10000);

}
  ngOnDestroy(): void {
    clearInterval(this.randomTimer);
  }

endFightResult(event : any){
  this.fightResult = event;
  if (this.fightResult == "win" && this.randomPokeList.find(i => i == this.poke2)){
    this._pokeService.postPokemonForm(this._launcher.getUserToken ,this.poke)
    this.randomPokeList.splice(this.randomPokeList.indexOf(this.poke2), 1);
  }
  else if (this.fightResult == "catch"  && this.randomPokeList.find(i => i == this.poke2)){
    this._pokeService.postPokemonForm(this._launcher.getUserToken, this.poke2)
    this.randomPokeList.splice(this.randomPokeList.indexOf(this.poke2), 1);
  }
  let user : Trainer = this._launcher.getUser();
  user.clic += this.clicInParent;
  this._launcher.updateUser(user);
  this.fightResult = "";
  //this.poke2 = {} as any;
}

onChildClick(event: any) {
  this.clicInParent = event;
}

clickEnemy(enemy : pokemonForm) {
  this.poke2 = enemy;
}
clickPlayer(player : pokemonForm) {
  this.poke = player;
}
}
