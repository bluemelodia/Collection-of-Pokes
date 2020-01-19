# MyPokemon

## Metadata 

- Angular needs to know how the pieces of your application fit together and what other files and libraries the app requires. This information is called metadata.

- Ex. @Component decorators, @NgModule decorators.

- The most important @NgModule decorator annotates the top-level AppModule class.
- The Angular CLI generated an AppModule class in src/app/app.module.ts when it created the project. This is where you opt-in to modules.

## NgModule

- An NgModule describes how the application parts fit together. Every application has at least one Angular module, the root module that you bootstrap to launch the application. By convention, it is usually called AppModule. More info: https://angular.io/guide/bootstrapping

- Each component must be declared in exactly ONE NgModule.

- NgModules take metadata objects that describe how to compile a component's template and how to create an injector at runtime. It identifies the module's own components, directives, and pipes, making some of them public, through the exports property, so that external components can use them. @NgModule can also add service providers to the application dependency injectors.

- Angular libraries are NgModules (ex. FormModules), as are many third party libraries. More info: https://angular.io/guide/ngmodules

## WebAPI

This tutorial sample mimics communication with a remote data server by using the In-memory Web API module.

After installing the module, the app will make requests to and receive responses from the HttpClient without knowing that the In-memory Web API is intercepting those requests, applying them to an in-memory data store, and returning simulated responses.

By using the In-memory Web API, you won't have to set up a server to learn about HttpClient.

##HttpClient

All HttpClient methods return an RxJS Observable of something.

HTTP is a request/response protocol. You make a request, it returns a single response.

In general, an observable can return multiple values over time. An observable from HttpClient always emits a single value and then completes, never to emit again.

This particular HttpClient.get() call returns an Observable<Pokemon[]>; that is, "an observable of pokemon arrays". In practice, it will only return a single pokemon array.

##HttpClient.get() returns response data

HttpClient.get() returns the body of the response as an untyped JSON object by default. Applying the optional type specifier, <Pokemon[]>, gives you a typed result object.

The server's data API determines the shape of the JSON data. The Tour of Heroes data API returns the pokemon data as an array.

Other APIs may bury the data that you want within an object. You might have to dig that data out by processing the Observable result with the RxJS map() operator.

Although not discussed here, there's an example of map() in the getHeroNo404() method included in the sample source code.


## angular-in-memory-web-api genID

Collection items are presumed to have a primary key property called id.

You can specify the id while adding a new item. The service will blindly use that id; it does not check for uniqueness.

If you do not specify the id, the service generates one via the genId method.

You can override the default id generator with a method called genId in your InMemoryDbService. Your method receives the new item’s collection and collection name. It should return the generated id. If your generator returns null|undefined, the service uses the default generator.

__________________________________________________________________________

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
