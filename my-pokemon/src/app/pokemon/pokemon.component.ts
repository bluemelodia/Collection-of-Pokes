import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';

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

  pokemon: Pokemon = {
  	dex: 246,
  	cp: 1040,
  	species: "Larvitar",
  	name: "Guac",
  	type: "Rock"
  };

  constructor() { }

  /* 
  	Lifecycle hook, called shortly by Angular after creating a component. 
  	Initialization logic goes here. 
  */
  ngOnInit() {
  }

}
