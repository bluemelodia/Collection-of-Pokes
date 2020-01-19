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

  //selectedPokemon: Pokemon;
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

  /*
	Previously, the parent HeroesComponent set the 
	PokemonDetailComponent.pokemon property and the PokemonDetailComponent 
	displayed the hero.

	PokemonComponent doesn't do that anymore. Now the router 
	creates the PokemonDetailComponent in response to a URL 
	such as ~/detail/11.
  */
  /*onSelect(pokemon: Pokemon): void {
  	this.selectedPokemon = pokemon;
  }*/

  /* 
  	Wait for the Observable to emit the array of Pokemons asynchronously. The subscribe() method passes the emitted array to the callback, which sets the component's pokemons property.
  */
  getPokemon(): void {
  	this.pokemonService.getPokemons()
  		.subscribe(pokemons => this.pokemons = pokemons);
  	//this.pokemons = this.pokemonService.getPokemons();
  }

/*
  When the fields are non-blank, the handler creates a 
  Pokemon-like object from the name (it's only missing the id)
  and passes it to the services addPokemon() method.

  When addPokemon() saves successfully, the subscribe() 
  callback receives the new pokemon and pushes it into to the
  pokemons list for display.
*/
  add(cp: number, dex: number, species: string, type: string, 
    name: string): void {
      name = name.trim();
      if (!name) { return; }

      species = species.trim();
      if (!species) { return; }

      type = type.trim();
      if (!type) { return; }

      this.pokemonService.addPokemon({ 
          cp: cp,
          dex: dex,
          species: species,
          type: type,
          name: name
      } as Pokemon)
        .subscribe(pokemon => {
            this.pokemons.push(pokemon);
        });
  }

  /*
  Although the component delegates pokemon deletion to the 
  PokemonService, it remains responsible for updating its 
  own list of pokemons. The component's delete() method
  immediately removes the pokemon-to-delete from that list,
  anticipating that the PokemonService will succeed on the server.

  There's really nothing for the component to do with the 
  Observable returned by pokemonService.delete() but 
  it must subscribe anyway.

  If you neglect to subscribe(), the service will not 
  send the delete request to the server. 
  As a rule, an Observable does nothing until something subscribes.

  Confirm this for yourself by temporarily removing the subscribe(),
  clicking "Dashboard", then clicking "Poke,mons". 
  You'll see the full list of pokemons again.

  */
  delete(pokemon: Pokemon): void {
      this.pokemons = this.pokemons.filter(p => p !== pokemon);
      this.pokemonService.deletePokemon(pokemon).subscribe();
  }
}
