import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../pokemon';

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

  constructor() { }

  ngOnInit() {
  }

}
