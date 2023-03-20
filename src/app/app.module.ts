import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModulesModule } from './shared/modules/modules.module';
import { ClickComponent } from './shared/component/click/click/click.component';

@NgModule({
  declarations: [
    AppComponent,
    ClickComponent

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
