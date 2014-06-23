/**
 * Make sure the web api is working properly.
 *
 */
(function() {
	"use strict";

	//get all products from the server
	var xmlhttp = new window.XMLHttpRequest();
	xmlhttp.open("GET", "http://localhost:8888/api/products", true);
	xmlhttp.send();

}());