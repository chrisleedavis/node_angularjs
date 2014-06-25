/*
	Create wrapper for all http requests going out to the server
	- will have static methods
	- will have promise support (Chrome is your best bet here)

	Usage:
		CPTS.http.getAll()
		CPTS.http.get("12GBE445")
		CPTS.http.delete("12GBE445")
		CPTS.http.put({foo: bar})
		CPTS.http.post({foo: bar}})
 */
(function(){
	"use strict";

	var httpRequest,
		http = {

			post: function(product) {

				validateRequest(product);
				return buildPromiseFromHttpRequest({ 
					httpMethod: "POST", 
					data: product
				});
			},

			get: function(sku) {

				validateRequest(sku);
				return buildPromiseFromHttpRequest({ 
					httpMethod: "GET", 
					sku: sku
				});
			},

			getAll: function() {

				return buildPromiseFromHttpRequest({ 
					httpMethod: "GET"
				});
			},

			put: function(product) {

				validateRequest(product);
				return buildPromiseFromHttpRequest({ 
					httpMethod: "PUT", 
					data: product,
					sku: product.sku
				});
			},

			delete: function(sku) {

				validateRequest(sku);
				return buildPromiseFromHttpRequest({ 
					httpMethod: "DELETE", 
					sku: sku
				});
			}
		};

		function buildPromiseFromHttpRequest(options) {

			var promise = new window.Promise(function(resolve, reject) {

				function handleRequest() {

					var problemError = "There was a problem with the request.";

					httpRequest.onerror = reject(problemError);

					try {
					    if (httpRequest.readyState === 4) { //DONE
					      if (httpRequest.status === 200) {
					        resolve(httpRequest.response); //json object
					      } else {
					        reject(problemError);
					      }
					    }
					  }
					  catch( e ) {
					    reject("Caught Exception: " + e.description);
					  }
				}

				makeHttpRequest(options, handleRequest);

			});

			return promise;
		}

	function validateRequest(data) {
		if (!data) {
			throw "must have valid data before submitting this request";
		}
	}

	//from https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started
	function makeHttpRequest(options, handleRequest) {

		var sku = "";

		if (window.XMLHttpRequest) {

	      httpRequest = new window.XMLHttpRequest();
	    } else if (window.ActiveXObject) { // IE

	      try {
	        httpRequest = new window.ActiveXObject("Msxml2.XMLHTTP");
	      } 
	      catch (ex) {
	        try {
	          httpRequest = new window.ActiveXObject("Microsoft.XMLHTTP");
	        } 
	        catch (exc) {
	        	//let the condition below handle httpRequest issues
	        }
	      }
	    }

	    if (!httpRequest) {
	      console.error("Could not send http request, please update your browser");
	      return false;
	    }

	    httpRequest.onreadystatechange = handleRequest;

	    if (options.sku) {
	    	sku = "/" + options.sku;
	    }

	    httpRequest.open(options.httpMethod, 
	    	"http://localhost:8888/api/products" + sku, true);

	    httpRequest.responseType = "json"; //can use response instead of responseText

		httpRequest.setRequestHeader("Content-Type", "application/json");
		httpRequest.setRequestHeader("Cache-Control", "no-cache"); //don"t cache requests
	    
	    //custom headers
	    if (options.headers) {
	    	options.headers.forEach(function(header) {
				httpRequest.setRequestHeader(header.key, header.value);
	    	});	    	
	    }

	    //submit the request
	    if (options.httpMethod === "POST" || options.httpMethod === "PUT") {
	    	httpRequest.send(JSON.stringify(options.data));	
	    } else {
			httpRequest.send();
	    }	        
	}

	CPTS.http = http;
	
}());