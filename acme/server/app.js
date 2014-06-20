/**
 * Main js file for starting the application/server (acme)
 *  - main bootstrapping of express server will be handled here
 *  - serving up both static content and web api
 */
/* jshint node:true */
(function() {
	"use strict";

	var express = require("express"),
		users = require("./users"),
		app = express();

		//index.html, js, css
		app.use(express.static("public"));

		//web api routing
		app.get("/api/users", users.findAll);
		app.get("/api/users/:id", users.findById);
		app.post("/api/users", users.addUser);
		app.put("/api/users/:id", users.updateUser);
		app.delete("/api/users/:id", users.deleteUser);

		console.log("Acme server has started...");

		app.listen(8888);
}());