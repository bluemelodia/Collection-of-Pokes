import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Pokemon } from './pokemon';
import { Injectable } from '@angular/core';

// Replaces mock-pokemons.ts
// When the server is ready, you'll detach the In-memory Web API, and the app's requests will go through to the server.
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
	createDb() {
		const pokemons = [{
	  	dex: 246,
	  	cp: 1040,
	  	species: "Larvitar",
	  	name: "Cauliflower",
	  	type: "Rock",
	  	id: 1
  	},
	{
	  	dex: 384,
	  	cp: 3834,
	  	species: "Tyranitar",
	  	name: "Broccoli",
	  	type: "Rock/Dark", 
	  	id: 2
  	},
  	{
	  	dex: 384,
	  	cp: 3834,
	  	species: "Tyranitar",
	  	name: "Cabbage",
	  	type: "Rock/Dark",
	  	id: 3
  	},
	{
	  	dex: 384,
	  	cp: 3835,
	  	species: "Rayquaza",
	  	name: "Comet",
	  	type: "Dragon/Flying",
	  	id: 4
  	},
	{
	  	dex: 483,
	  	cp: 4038,
	  	species: "Dialga",
	  	name: "Yue",
	  	type: "Steel/Dragon",
	  	id: 5
  	},
  	{
	  	dex: 483,
	  	cp: 4038,
	  	species: "Dialga",
	  	name: "Yang",
	  	type: "Steel/Dragon",
	  	id: 6
  	},
  	{
	  	dex: 484,
	  	cp: 3991,
	  	species: "Palkia",
	  	name: "Puddles",
	  	type: "Water/Dragon",
	  	id: 7
  	}];
		return {pokemons};
	}
    
    // Overrides the genId method to ensure that a pokemon always has an id.
	// If the pokemons array is empty,
	// the method below returns the initial number (11).
	// if the pokemons array is not empty, the method below returns the highest
	// pokemon id + 1.
	genId(pokemons: Pokemon[]): number {
		return pokemons.length > 0? Math.max(...pokemons.map(pokemon => pokemon.id)) + 1 : 11;
	}
}
