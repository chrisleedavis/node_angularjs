/*
    Promise object used with http concept is ES 6/Chrome-specific.  A mock will need to be
    created here along with a mock for the XMLHttpRequest for testing purposes.  The
    headless browser PhantomJS doesn't have the ES6 Promise object anyway...
*/
(function() {
    "use strict";

     var Promise, readyState, status, response, statusText,

         resetHttpPrototype = function() {

             window.XMLHttpRequest.prototype = {
                onreadystatechange: function() {},
                open: function(method, uri, isAsync) {},
                responseType: "json",
                setRequestHeader: function(key, value) {},
                send: function(data) {
                    this.readyState = readyState;
                    this.status = status;
                    this.statusText = statusText;
                    this.response = response;
                    this.onreadystatechange();
                }
             };
         };

     //mock ES 6 Promise (only for functionality being used within http.js, obviously without all([])...)
     if (!window.Promise) {

        window.Promise = function(callback) {

            if (this instanceof window.Promise === false) {
                return new window.Promise(callback);
            }

            //make sure callback is passed into the promise and callback has 2 parameters
            if (!_.isFunction(callback) || (_.isFunction(callback) && callback.length < 2)) {
                return new Error("Promises must include a callback with the instantiation");
            } else {
                this._init();
                callback.call(this, _.bind(this._resolve, this), _.bind(this._reject, this));
            }

            return this;
        };

        window.Promise.prototype = {

            _init: function() {
                this.itemCount = 1;
            },

            _resolve: function(data) {
                this.itemCount = 0;
                this.resolution = data;
            },

            _reject: function(data) {
                this.itemCount = 0;
                this.rejection = data;
            },

            //only run the callback if the resolve/reject has completed (reducing itemCount to 0)
            _runInterval: function(callback, data) {

                var self = this,
                    interval = window.setInterval(function() {

                        if (!self.itemCount) {
                           window.clearInterval(interval);
                           callback.call(self, data);
                        }
                    }, 1);
            },

            then: function(callback) {
                 this._runInterval(callback, this.resolution);
            },

            error: function(callback) {
                this._runInterval(callback, this.rejection);
            }
        };

        Promise = window.Promise;
     }

     window.XMLHttpRequest = function() {

        if (this instanceof window.XMLHttpRequest === false) {
            return new window.XMLHttpRequest();
        }

        this.responseType = "json";

        return this;
     };

     //required by jasmine for all async testing
     beforeEach(function() {

        var flag, value;

        window.runs(function() {
          flag = false;
          value = 0;

          window.setTimeout(function() {
            flag = true;
          }, 1);
        });

        window.waitsFor(function() {
          value++;
          return flag;
        }, "The Value should be incremented", 1);

     });

     beforeEach(function() {
        //defaults will be SUCCESS response
        readyState = 4;
        status = 200;
        statusText = "";
        response = {};
     });

     describe("HTTP Tests", function() {

        it("make sure mock Promise will use a callback function when instantiated", function() {

            var promise = new Promise(function(resolve, reject) {});

            expect(promise instanceof Promise).toBeTruthy();

            //now with missing callback
            promise = new Promise();
            expect(promise instanceof Error).toBeTruthy();
        });

        it("make sure mock Promise 'then' will work properly when promise is resolved", function() {

            var foo = "foo",
                promise = new Promise(function(resolve, reject) {
                       resolve(foo);
                   });

            promise.then(function(data) {

                expect(data).toEqual(foo);
            });
        });

        it("should GET/READ ALL properly with http with SUCCESS response", function() {

            var products = ["foo", "bar"];

            response = products;
            resetHttpPrototype();

            CPTS.http.getAll().then(function(data) {
                expect(data).toEqual(products);
            });

        });

        it("should REJECT properly with http with FAILED response", function() {

            var failedStatus = 500;
            status = failedStatus;
            statusText = failedStatus;
            resetHttpPrototype();

            CPTS.http.getAll().error(function(data) {
                expect(data).toEqual(new window.Error(failedStatus));
            });

        });

        it("should GET/READ properly with http with SUCCESS response", function() {

            var product = {foo: "bar"};

            response = product;
            resetHttpPrototype();

            CPTS.http.get("foo").then(function(data) {
                expect(data).toEqual(product);
            });

        });

        it("should DELETE properly with http with SUCCESS response", function() {

            var message = "SUCCESS";

            response = message;
            resetHttpPrototype();

            CPTS.http["delete"]("foo").then(function(data) {
                expect(data).toEqual(message);
            });

        });

        it("should PUT/UPDATE properly with http with SUCCESS response", function() {

            var product = {foo: "bar"};

            response = product;
            resetHttpPrototype();

            CPTS.http.put(product).then(function(data) {
                expect(data).toEqual(product);
            });

        });

        it("should POST/CREATE properly with http with SUCCESS response", function() {

            var product = {foo: "bar"};

            response = product;
            resetHttpPrototype();

            CPTS.http.post(product).then(function(data) {
                expect(data).toEqual(product);
            });

        });

     });

}());