import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FightComponent } from './fight/fight.component';
import { GameComponent } from './game.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path : '' , component: GameComponent, children : [
    { path : 'pokemons', component : PokemonsComponent },
    { path : 'pokedex', component : PokedexComponent },
    { path : 'fight', component : FightComponent },
    { path : 'profile', component : ProfileComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
