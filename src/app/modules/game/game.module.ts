import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { ModulesModule } from 'src/app/shared/modules/modules.module';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { GameBannerComponent } from './game-banner/game-banner.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { ShowStatsComponent } from './pokemons/show-stats/show-stats.component';
import { FightComponent } from './fight/fight.component';


@NgModule({
  declarations: [
    GameComponent,
    PokemonsComponent,
    GameBannerComponent,
    PokedexComponent,
    ShowStatsComponent,
    FightComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    ModulesModule,
  ]
})
export class GameModule { }
