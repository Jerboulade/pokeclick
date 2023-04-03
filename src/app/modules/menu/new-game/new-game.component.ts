import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { pokeListItem } from 'src/app/shared/models/pokeListItem';
import { pokemonDTO } from 'src/app/shared/models/pokemonDTO';
import { pokemonForm } from 'src/app/shared/models/pokemonForm';
import { Trainer } from 'src/app/shared/models/trainer';
import { LauncherService } from 'src/app/shared/services/launcher/launcher.service';
import { PokemapperService } from 'src/app/shared/services/mapper/pokemapper.service';
import { PokeService } from 'src/app/shared/services/pokeService/poke.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent {

constructor(private _formBuilder : FormBuilder,
            private _launcherService : LauncherService,
            private _pokeService : PokeService,
            private _router : Router,
            private _mapper : PokemapperService){}

form : FormGroup = this._formBuilder.group({
  pseudo : ['', [Validators.required]],
  key : ['', [Validators.required]],
  gender : ['unknown', [Validators.required]],
  condition : [false, [Validators.requiredTrue]]
})

formIsVisible : boolean = true;
starterIsVisible : boolean = false;
starters : number[] = [1, 4, 7]; // starter's order list
starterItemList : pokeListItem[] = [];
starter! : pokeListItem;
newUser! : Trainer;

launch(){
  this.newUser =  this._launcherService.signUp(this.form.getRawValue());
  this.formIsVisible = false;
  this.starters.forEach(order => {
    let item : pokeListItem | undefined = this._pokeService.getListItemByOrder(order);
    //console.log("lauch : ");
    //console.log(item);
    if (item)
      this.starterItemList.push(item);})
  this.starterIsVisible = true;
  console.log("---");
  console.log(this.starterItemList);
}

submitStarter(choiceIndex : number){
  let pok : pokemonDTO = this._pokeService.getPokemonDTOByOrder(this.starters[choiceIndex])?.subscribe({
    next : (data : pokemonDTO) => {
      console.log("SUBMIT STARTER" + data.name);
      let startPok = this._mapper.dtoToForm(data)
      this._pokeService.postPokemonForm(this.newUser.token, startPok);
      this._pokeService.updateActivePokemonByIndex(this.newUser.token, startPok.getId, 0);
      this.starter = this.starterItemList[choiceIndex];
      // use laucher to check user info + ... (√)
      this.starterIsVisible = false;
      this._router.navigate(['/game']); //, this._launcherService.getUserToken
    }
  })

}

}
