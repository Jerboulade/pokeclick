import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PokemonCardComponent } from '../component/pokemon-card/pokemon-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickComponent } from '../component/click/click/click.component';
import { PokemonFormCardComponent } from '../component/pokemon-form-card/pokemon-form-card.component';


@NgModule({
  declarations: [
    PokemonCardComponent,
    PokemonFormCardComponent,
    ClickComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    HttpClientModule,
    PokemonFormCardComponent,
    PokemonCardComponent,
    ClickComponent,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ModulesModule { }
