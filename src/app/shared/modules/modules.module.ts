import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PokemonCardComponent } from '../component/pokemon-card/pokemon-card.component';


@NgModule({
  declarations: [
    PokemonCardComponent
  ],
  imports: [
    CommonModule,
  ],
  exports : [
    HttpClientModule,
    PokemonCardComponent
  ]
})
export class ModulesModule { }
