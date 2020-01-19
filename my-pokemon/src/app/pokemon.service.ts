/*
	Injectable - marks the class as one that participates in the dependency injection system. This class provides an injectable service, and can also have its own injected dependencies.

	We must make this service available to the DI system before Angular can inject it into the PokemonComponent. We do this by registering a provider, which is something that can create or deliver a service -> in this case, it instantiates the PokemonService class to provide the service.

	To make sure the PokemonService can provide this service, register it with the injector, the object responsible for choosing and injecting the provider where the app requires it. By default, the Angular CLI command ng generate service registers a provider with the root injector for your service by including provider metadata, that is providedIn: 'root' in the @Injectable() decorator.

	When you provide the service at the root level, Angular creates a single, shared instance of PokemonService and injects into any class that asks for it. Registering the provider in the @Injectable metadata also allows Angular to optimize an app by removing the service if it turns out not to be used after all.
*/

import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { POKEMONS } from './mock-pokemon';

import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  /*
    Define the pokemonUrl of the form :base/:collectionName with the
    address of the pokemon resource on the server. Here base is the
    resource to which requests are made, and collectionName is 
    the pokemons data object in the in-memory-data-service.ts.
  */
  private pokemonsUrl = 'api/pokemons'; // URL to web api

  /* Angular will inject the singleton MessageService into this property
  	when it creates the PokemonService. 

	This is a typical "service-in-service" scenario: you inject 
	the MessageService into the HeroService which is injected 
	into the HeroesComponent.

  	*/
  constructor(
    private http: HttpClient, 
    private messageService: MessageService) { }

  /* Returns an Observable<Pokemon[]> that emits a single value, an array of mock Pokemon. */
  // getPokemons(): Observable<Pokemon[]> {
  // 	this.log('fetched Pokemons');
  // 	return of(POKEMONS);
  // }
  
  /* Get Pokemons from the server. */
  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonsUrl);
  }

  /* It returns a mock hero as an Observable, using the RxJS of() function. */
  getPokemon(id: number): Observable<Pokemon> {
  	this.log(`fetched Pokemon id=${id}`);
  	return of(POKEMONS.find(pokemon => pokemon.id === id));
  }

  /* Log a PokemonService message. */
  private log(message: string) {
    this.messageService.add(`PokemonService: ${message}`);
  }
}
