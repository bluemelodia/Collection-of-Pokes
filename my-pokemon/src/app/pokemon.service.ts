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

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  /* Returns an Observable<Pokemon[]> that emits a single value, an array of mock Pokemon. */
  getPokemons(): Observable<Pokemon[]> {
  	return of(POKEMONS);
  }
}
