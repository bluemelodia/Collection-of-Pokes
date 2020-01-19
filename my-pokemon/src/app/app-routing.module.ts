import { NgModule } from '@angular/core';

/* Allows the app to have routing functionality. */
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './pokemon/pokemon.component';

/* Routes tell the Router which view to display when a user clicks
a link or pastes a URL into the browser address bar. 

    path: a string that matches the URL in the browser address bar.
    component: the component that the router should create when navigating to this route.
*/
const routes: Routes = [
	{ path: 'pokemon', component: PokemonComponent }
];

/*
	@NgModule metadata initializes the router and starts it listening
	for browser location changes. 

	The line below adds the RouterModule to the AppRoutingModule 
	imports array and configures it with the routes in one step 
	by calling RouterModule.forRoot()

	The method is called forRoot() because you configure the router
	at the application's root level. The forRoot() method supplies
	the service providers and directives needed for routing, and
	performs the initial navigation based on the current browser URL.

	Next, we export RouterModule so it will be available throughout
	the app. 
*/
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
