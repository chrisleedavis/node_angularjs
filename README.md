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
* from within the acme/server directory, run the following commands:

```js
npm install grunt-cli@0.1.11 -g
```
this will install the module required by grunt to run the grunt watch for managing static content, running tests as you develop, etc.


```js
npm install
```
this will make sure all of the rest of the appropriate node modules are installed within the server directory so the site will run

```shell
node app
```
this will start the node server for (localhost:8888)

```shell
grunt watch
```
this will start grunt so it can build the static content for the site along with providing you with a monitor while you develop to make sure your changes are pushed out the server and all tests for the application pass

