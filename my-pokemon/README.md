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
