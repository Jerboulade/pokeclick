import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PokemonCardComponent } from '../component/pokemon-card/pokemon-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PokemonCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    HttpClientModule,
    PokemonCardComponent,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ModulesModule { }
