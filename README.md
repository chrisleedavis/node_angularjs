node_angularjs
==============

This is a rough scratchpad for a simple angularjs application.  THIS IS STILL WORK IN PROGRESS...

## Assumptions ##
* You are familiar with [nodejs](http://nodejs.org/)
* You are familiar with [gruntjs](http://gruntjs.com/)

## Why? ##
* Serve up a simple angularjs site using nodejs/express to highlight core concepts within angularjs
	* client-side routing
	* web api interaction for CRUD
	* show model binding, controllers, services, providers, etc
	* testing

* Show an example of using gruntjs to manage/build static content
	* css & js
	* bundling & minification
	* source maps
	* jshint
	* watch complete with unit tests
	* ngtemplates for compiling html templates into ng modules
	* responsive design using bootstrap

* Other
	* this site will also show basic concepts within HTML 5 & JavaScript
		* so also within the site, there will be pages displaying general JS concepts
		* what's new in HTML 5

## What's functional at this point? ##
* The site itself (localhost:8888)
* Initial grunt tests (server-side for express via mocha)

## Setup? ##
* make sure nodejs is installed
* from within the acme/application directory, run the following commands:

```js
npm install grunt-cli@0.1.11 -g
```
this will install the module required by grunt to run the grunt watch for managing static content, running tests as you develop, etc.

```js
npm install karma-cli@0.0.4 -g
```
this will install the module required by grunt to run the karma tests in watch mode so they will run while you make modifications to static content

```js
npm install
```
this will make sure all of the rest of the appropriate node modules are installed within the application directory so the site will run

```shell
grunt concurrent
```
this will start grunt so it can:

1. Start the express app (localhost:8888)
2. Build static content (css, js, etc.)
3. Run tests for application
4. Perform jshint operations to help keep code clean
5. Start watch so file changes will kick of builds, jshint, test runner, etc.


