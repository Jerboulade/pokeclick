import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { NewGameComponent } from './new-game/new-game.component';
import { LoadGameComponent } from './load-game/load-game.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PokeService } from 'src/app/shared/services/pokeService/poke.service';
import { ModulesModule } from 'src/app/shared/modules/modules.module';
import { ClickerComponent } from './clicker/clicker.component';
import { PopComponent } from './clicker/pop/pop/pop.component';


@NgModule({
  declarations: [
    MainMenuComponent,
    NewGameComponent,
    LoadGameComponent,
    ClickerComponent,
    PopComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ReactiveFormsModule,
    ModulesModule,
  ]
})
export class MenuModule { }
