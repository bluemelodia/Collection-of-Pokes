/*
	Defines the root module, named AppModule, that tells Angular how to assemble the application. Initially declares only the AppComponent. As you add more components to the app, they must be declared here.
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* HttpClient is Angular's mechanism for communicating with a remote server over HTTP. */
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

/* This symbol must be imported for the input data binding to work in pokemon.component.ts. This is because NgModel is not available by default. */
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PokemonSearchComponent } from './pokemon-search/pokemon-search.component';

/* 
  declarations - application components
  imports - contains a list of external modules that the app needs. 
*/
@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    PokemonDetailComponent,
    MessagesComponent,
    DashboardComponent,
    PokemonSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // The forRoot() configuration method takes an InMemoryDataService class
    // that primes the in-memory database.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
