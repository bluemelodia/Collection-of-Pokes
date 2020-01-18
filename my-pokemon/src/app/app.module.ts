/*
	Defines the root module, named AppModule, that tells Angular how to assemble the application. Initially declares only the AppComponent. As you add more components to the app, they must be declared here.
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* This symbol must be imported for the input data binding to work in pokemon.component.ts. This is because NgModel is not available by default. */
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';

/* 
  declarations - application components
  imports - contains a list of external modules that the app needs. 
*/
@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
