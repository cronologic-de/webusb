# webusb-frontend

This is the frontend for the [cronologic WebUSB project](https://github.com/cronologic-de/webusb).
It’s based on [Vue.js 2](https://vuejs.org/) and [Vuetify](https://vuetifyjs.com/) and uses the npm package manager.

Vue is the basic JavaScript framework that provides the concept of “components”.
It also takes care of templating, state management and data binding.

Vuetify calls itself a “Material Design Framework”:
It implements [Material Design](https://material.io/) look and feel on top of Vue and comes with a lot of utility functionality, e.g. for responsive design.

## Project setup

After cloning the project, navigate to the `frontend` folder (the one this readme file lives in) and run

```sh
npm install
```

to fetch all of its dependencies.

There are some npm scripts predefined:

* `npm run serve` will start a local development webserver with hot reloads.
* `npm run build` will build the application for production deployment. The resulting files can be found in the `dist` folder afterwards.
* `npm run lint` will check the code for style issues.

## Development

Teaching you how to use Vue is out of scope of this readme, but here are a few pointers to interesting parts of the codebase:

* [`App.vue`](src/App.vue) contains the markup and logic for the main (and only) page.
* It uses the [`ClockConfig`](src/components/ClockConfig.vue) and [`ChannelConfig`](src/components/ChannelConfig.vue) components to provide a configuration UI for the system’s parameters.
* [`serial.js`](src/lib/serial.js) contains some convenience wrapper code around Web Serial.
* Branding images are in [`assets`](src/assets).
