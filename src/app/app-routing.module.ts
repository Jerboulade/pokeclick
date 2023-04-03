import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaunchGameGuard } from './shared/guard/lauch-game/launch-game.guard';

const routes: Routes = [
  { path : '', loadChildren : () => import('./modules/menu/menu.module').then(m => m.MenuModule) },
  { path : 'game', canLoad : [LaunchGameGuard] ,loadChildren : () => import('./modules/game/game.module').then(m => m.GameModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
