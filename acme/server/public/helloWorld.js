/**
 * Make sure the web api is working properly.
 *
 */
(function() {
	"use strict";

	//get all users from the server
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "http://localhost:8888/api/users", true);
	xmlhttp.send();

}());