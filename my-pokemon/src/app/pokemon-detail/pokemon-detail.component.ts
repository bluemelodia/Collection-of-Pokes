import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../pokemon';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PokemonService } from '../pokemon.service';

/* 

This component receives a pokemon object through its pokemon property and displays it. 

This template binds to the component's pokemon property, which is of type Pokemon. This property must be an Input property, because the external
PokemonComponent will bind to it like this:

<app-pokemon-detail [pokemon]="selectedPokemon"></app-pokemon-detail> 

Here we use property binding to set properties of target elements or directive @Input() decorators.
*/
@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  @Input() pokemon: Pokemon;

  /* 
		ActivatedRoute holds info about the route to this instance
		of the PokemonDetailComponent.

		This component is interested in the route's parameters 
		extracted from the URL. The "id" parameter is the id of 
		the pokemon to display.

		The PokemonService gets pokemon data from the remote server
		and this component will use it to get the pokemon-to-display.

		The location is an Angular service for interacting with the 
		browser. You'll use it later to navigate back to the view
		that navigated here.
  */
  constructor(
  	private route: ActivatedRoute,
  	private pokemonService: PokemonService,
  	private location: Location
  ) { }

  ngOnInit() {
  	this.getPokemon();
  }

  /*
	The route.snapshot is a static image of the route information
	shortly after the component was created.

	The paramMap is a dictionary of route parameter values extracted
	from the URL. The "id" key returns the id of the pokemon to fetch.

	Route parameters are always strings. The JavaScript (+)
	operator converts the string to a number, which is what a pokemon
	id should be.
  */
  getPokemon(): void {
  	const id = +this.route.snapshot.paramMap.get('id');
  	this.pokemonService.getPokemon(id)
  		.subscribe(pokemon => this.pokemon = pokemon);
  }

  /* Navigates backwards one step in the browser's history stack. */
  goBack(): void {
  	this.location.back();
  }

  /* persist name changes using the PokemonService updatePokemon()
  method, then navigates back to the previous view. */
  save(): void {
    this.pokemonService.updatePokemon(this.pokemon)
      .subscribe(() => this.goBack());
  }
}
