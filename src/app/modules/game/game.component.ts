import { Component } from '@angular/core';
import { pokemonForm } from 'src/app/shared/models/pokemonForm';
import { LauncherService } from 'src/app/shared/services/launcher/launcher.service';
import { MemoryCardService } from 'src/app/shared/services/memory-card/memory-card.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  starter! : pokemonForm | undefined;
  animate : boolean = false

  constructor(private _serv : MemoryCardService, private _launcher : LauncherService) {
    this.starter = _serv.getAnyPokemonByUserId(_launcher.getUserToken);
    console.log(this.starter);
    this.animate = true;
  }
}
