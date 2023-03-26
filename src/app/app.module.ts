import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModulesModule } from './shared/modules/modules.module';
import { ClickComponent } from './shared/component/click/click/click.component';
import { PokemonFormCardComponent } from './shared/component/pokemon-form-card/pokemon-form-card.component';

@NgModule({
  declarations: [
    AppComponent
],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    ModulesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
