import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

/*
The class is similar to the PokemonComponent class.

    - It defines a pokemon array property.
    
    - The constructor expects Angular to inject the PokemonService 
    into a private pokemonService property.
    
    - The ngOnInit() lifecycle hook calls getPokemons().

This getPokemons() returns the sliced list of pokemons at positions
 1 and 5, returning only four of the My Pokemon 
 (2nd, 3rd, 4th, and 5th).
*/
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
  	this.getPokemons();
  }

  getPokemons(): void {
  	this.pokemonService.getPokemons()
  		.subscribe(pokemons => this.pokemons = pokemons.slice(0, 4));
  }
}
