import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pokeListItem } from 'src/app/shared/models/pokeListItem';
import { pokemonForm } from 'src/app/shared/models/pokemonForm';
import { LauncherService } from 'src/app/shared/services/launcher/launcher.service';
import { PokeService } from 'src/app/shared/services/pokeService/poke.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent {

constructor(private _formBuilder : FormBuilder, private _launcherService : LauncherService, private _pokeService : PokeService){}

form : FormGroup = this._formBuilder.group({
  pseudo : ['', [Validators.required]],
  key : ['', [Validators.required]],
  condition : [false, [Validators.requiredTrue]]
})

formIsVisible : boolean = true;
starterIsVisible : boolean = false;
starters : number[] = [1, 4, 7]; // starter's order list
starterItemList : pokeListItem[] = [];
starter! : pokeListItem;

launch(){
  this._launcherService.createUser(this.form.getRawValue());
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
  let starter : pokemonForm = {
    order : this.starterItemList[choiceIndex].order,
    level : 0,
    xp: 0
  }
  this.starter = this.starterItemList[choiceIndex];
  // use laucher to check user info + ... (√)
  this._pokeService.postPokemonForm(this._launcherService.connectedAs, starter);
  this.starterIsVisible = false;
}

}
