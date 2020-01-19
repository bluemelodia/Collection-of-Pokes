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
import { catchError, map, tap } from 'rxjs/operators';

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

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application-json' })
  };

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
  /* To catch errors, you "pipe" the observable result from http.get()
  through an RxJS catchError() operator. We extend the observable 
  result with the pipe() method and give it a catchError() operator. 

  The catchError() operator intercepts an Observable that failed. 
  It passes the error an error handler that can do what it wants 
  with the error.

  The following handleError() method reports the error and then
  returns an innocuous result so that the application keeps working.

  ==============================================================

  The PokemonService methods will tap into the flow of observable
  values and send a message, via the log() method, to the message
  area at the bottom of the page.

  They'll do that with the RxJS tap() operator, which looks at
  the observable values, does something with those values, and
  passes them along. The tap() call back doesn't touch the 
  values themselves.
*/
  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonsUrl)
      .pipe(
          tap(_ => this.log('fetched pokemons')),
          catchError(this.handleError<Pokemon[]>('getPokemons', []))
      );
  }

  /* It returns a mock hero as an Observable, using 
  the RxJS of() function. */

  /* GET Pokemon by id, will 404 if id not found.

  There are three significant differences from getPokemons():

    - getPokemon() constructs a request URL with the desired 
      pokemon's id.
    - The server should respond with a single pokemon rather 
      than an array of pokemon.
    - getPokemon() returns an Observable<Pokemon> 
      ("an observable of Pokemon objects") rather than an 
      observable of pokemon arrays.
 */
  getPokemon(id: number): Observable<Pokemon> {
  	//this.log(`fetched Pokemon id=${id}`);
    const url = `${this.pokemonsUrl}/${id}`;
    return this.http.get<Pokemon>(url).pipe(
        tap(_ => this.log(`fetched Pokemon id=${id}`)),
        catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
    );
  	//return of(POKEMONS.find(pokemon => pokemon.id === id));
  }

  /** PUT: update the pokemon on the server 

  The HttpClient.put() method takes three parameters:
    the URL
    the data to update (the modified pokemon in this case)
    options

  The URL is unchanged. The pokemon web API knows which pokemon
  to update by looking at the pokemon's id.

  The pokemon web API expects a special header in 
  HTTP save requests. That header is in the httpOptions
  constant defined in the PokemonService.
  */
  updatePokemon(pokemon: Pokemon): Observable<any> {
      return this.http.put(this.pokemonsUrl, pokemon, this.httpOptions).pipe(
          tap(_ => this.log(`updated Pokemon id=${id}`)),
          catchError(this.handleError<any>(`updateHero`))
      );
  }

  /* Log a PokemonService message. */
  private log(message: string) {
    this.messageService.add(`PokemonService: ${message}`);
  }

  /*
    The following handleError() will be shared by many PokemonService
    methods so it's generalized to meet their different needs.

    Instead of handling the error directly, it returns an error
    handler function to catchError that it has configured with both
    the name of the operation that failed and a safe return value.

    After reporting the error to the console, the handler 
    constructs a user friendly message and returns a safe value
    to the app so the app can keep working.

  Because each service method returns a different kind of 
  Observable result, handleError() takes a type parameter 
  so it can return the safe value as the type that the app expects.
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
