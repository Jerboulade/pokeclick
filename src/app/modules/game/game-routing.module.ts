import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokemonsComponent } from './pokemons/pokemons.component';

const routes: Routes = [
  { path : '' , component: GameComponent, children : [
    { path : 'pokemons', component : PokemonsComponent },
    { path : 'pokedex', component : PokedexComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
