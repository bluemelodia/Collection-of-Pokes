import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.css']
})
export class PokemonSearchComponent implements OnInit {
	pokemons$: Observable<Pokemon[]>;

	/* This is a RxJS subject. A Subject is both a source of 
	observable values and an Observable itself. You can subscribe
	to a Subject as you would any Observable.

	You can also push values into that Observable by calling
	its next(value) method as the search() method does.

	The event binding to the textbox's input event calls
	the search() method.

	Every time the user types in the textbox, the binding
	calls search() with the textbox value, a "search term".
	The searchTerms becomes an Observable emitting a steady
	stream of search terms. */
	private searchTerms = new Subject<string>();

  constructor(private pokemonService: PokemonService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
  		this.searchTerms.next(term);
  }

  /* 
	Passing a new search term directly to the searchPokemons()
	after every user keystroke would create an excessive amount
	of HTTP requests, taxing server resources and burning through
	data plans.

	Instead, the ngOnInit() method pipes the searchTerms observable
	through a sequence of RxJS operators that reduce the number of
	calls to the searchPokemons(), ultimately returning an observable
	of timely hero search results (each a Pokemon[]).

	Each operator works as follows:

    debounceTime(300) waits until the flow of new string events
    pauses for 300 milliseconds before passing along the latest
    string. You'll never make requests more frequently than 300ms.

    distinctUntilChanged() ensures that a request is sent only if
    the filter text changed.

    switchMap() calls the search service for each search term that
    makes it through debounce() and distinctUntilChanged(). 
    It cancels and discards previous search observables, 
    returning only the latest search service observable.

    Remember that the component class does not subscribe to 
    the pokemons$ observable. That's the job of the AsyncPipe
    in the template.

  */
  ngOnInit(): void {
  		this.pokemons$ = this.searchTerms.pipe( 
  			// wait 300ms after each keystroke before considering the term
  			debounceTime(300),
  			// ignore the new term if the same as previous term
  			distinctUntilChanged(),
  			// switch to new search observable each time the term changes
  			switchMap((term: string) => this.pokemonService.searchPokemon(term)),
  		);
  }

}
