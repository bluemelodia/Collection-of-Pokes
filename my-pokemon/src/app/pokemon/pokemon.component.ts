import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';

import { PokemonService } from '../pokemon.service';

/* 

Decorator function that specifies the Angular metadata for the component.

The CLI generated three metadata properties:

    selector — the component's CSS element selector, this matches the name
    	of the HTML element that identifies this component within a parent
    	component's template
    templateUrl — the location of the component's template file.
    styleUrls — the location of the component's private CSS styles.
*/
@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
}) /* Always export the component class so that it can be imported elsewhere, like in the AppModule. */
export class PokemonComponent implements OnInit {

  selectedPokemon: Pokemon;
  pokemons: Pokemon[];

  /* 
  This parameter defines a private pokemonService property and identifies it as a PokemonService injection site.

  When Angular creates a PokemonComponent, the DI system sets the pokemonService parameter to the singleton instance of PokemonService.

  Save this for simple initialization such as wiring constructor parameters to properties. The constructor shouldn't do anything.
  */
  constructor(private pokemonService: PokemonService) { }

  /* 
  	Lifecycle hook, called shortly by Angular after creating a component/constructing a component instance. Initialization logic goes here. 
  */
  ngOnInit() {
  	this.getPokemon();
  }

  onSelect(pokemon: Pokemon): void {
  	this.selectedPokemon = pokemon;
  }

  /* 
  		Wait for the Observable to emit the array of Pokemons asynchronously. The subscribe() method passes the emitted array to the callback, which sets the component's pokemons property.
  */
  getPokemon(): void {
  	this.pokemonService.getPokemons()
  		.subscribe(pokemons => this.pokemons = pokemons);
  	//this.pokemons = this.pokemonService.getPokemons();
  }
}
