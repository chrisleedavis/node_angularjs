(function() {
    "use strict";

    module.exports = function(grunt) {

        grunt.loadNpmTasks("grunt-contrib-watch");
        grunt.loadNpmTasks("grunt-karma");
        grunt.loadNpmTasks("grunt-angular-templates");
        grunt.loadNpmTasks("grunt-contrib-cssmin");
        grunt.loadNpmTasks("grunt-contrib-uglify");
        grunt.loadNpmTasks("grunt-contrib-jshint");
        grunt.loadNpmTasks("grunt-mocha-test");
        grunt.loadNpmTasks("grunt-concurrent");
        grunt.loadNpmTasks("grunt-nodemon");

        grunt.initConfig({
            pkg: grunt.file.readJSON("package.json"),

            concurrent: {
              start: {
                tasks: ["nodemon", "watch"],
                options: {
                  logConcurrentOutput: true
                }
              }
            },

            nodemon: {
              start: {
                script: "app.js"
              }
            },

            mochaTest: {
              test: {
                options: {
                  reporter: "spec",
                  clearRequireCache: true
                },
                src: ["test/**/*.js"]
              }
            },

            jshint: {
                options: {
                    "-W099": true, //allow mixed spaces and tabs
                    "globals": {   //define all known global variables
                        "window": true,
                        "console": true,
                        "document": true,
                        "angular": true,
                        "_": true
                    },
                    "strict": true, //use strict mode at function level
                    "undef": true, //make sure global variables are checked, excluded above globals filter,
                    "eqeqeq": true,  //make sure to enforce coercion within JS,
                    force: true    //don"t fail task if error reported
                },
                serverJS: ["app.js", 
                "errorModel.js", 
                "productController.js", 
                "productModel.js",
                "test/**/*.js"],
                clientJS: "public/**/*.js"
            },

            //to run, call `grunt karma:unit watch in console
            watch: {
                options: {
                    atBegin: true
                },
				mochaTest: {
					files: ["app.js", 
                            "errorModel.js", 
                            "productController.js", 
                            "productModel.js",
                            "test/**/*.js"],
					tasks: ["jshint", "mochaTest"],
					options: {
					  spawn: false
					}
				},
                clientJS: {
                    files: ["public/**/*.js"],
                    tasks: ["jshint"],
                    options: {
                        spawn: false
                    }
                }
            }
        });
    };

}());