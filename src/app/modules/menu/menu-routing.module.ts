import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadGameComponent } from './load-game/load-game.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { NewGameComponent } from './new-game/new-game.component';

const routes: Routes = [
  { path : '', component : MainMenuComponent },
  { path : 'newgame', component : NewGameComponent },
  { path : 'loadgame', component : LoadGameComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
