import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { NewGameComponent } from './new-game/new-game.component';
import { LoadGameComponent } from './load-game/load-game.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PokeService } from 'src/app/shared/services/pokeService/poke.service';
import { PokemonCardComponent } from 'src/app/shared/component/pokemon-card/pokemon-card.component';


@NgModule({
  declarations: [
    MainMenuComponent,
    NewGameComponent,
    LoadGameComponent,
    PokemonCardComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    PokeService
  ]
})
export class MenuModule { }
