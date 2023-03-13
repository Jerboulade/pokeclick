import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { NewGameComponent } from './new-game/new-game.component';
import { LoadGameComponent } from './load-game/load-game.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PokeService } from 'src/app/shared/services/pokeService/poke.service';
import { ModulesModule } from 'src/app/shared/modules/modules.module';


@NgModule({
  declarations: [
    MainMenuComponent,
    NewGameComponent,
    LoadGameComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ReactiveFormsModule,
    ModulesModule
  ],
  providers: [
    PokeService
  ]
})
export class MenuModule { }
