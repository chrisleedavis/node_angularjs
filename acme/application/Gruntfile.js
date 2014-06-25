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
                tasks: ["nodemon", "uglify", "watch"],
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
                        "_": true,
                        "CPTS": true
                    },
                    "strict": true, //use strict mode at function level
                    "undef": true, //make sure global variables are checked, excluded above globals filter,
                    "eqeqeq": true,  //make sure to enforce coercion within JS,
                    force: true    //don"t fail task if error reported
                },
                serverSideJS: ["app.js", 
                "errorModel.js", 
                "productController.js", 
                "productModel.js",
                "test/**/*.js"],
                clientSideJS: ["concepts/**/*.js"]
            },

            uglify: {
                options: {
                    mangle: false,
                    beautify : 
                    {
                        ascii_only : true  //will help with angular & unicode characters (localization: posPre, negPre (\u00a4))
                    }
                },

                concepts: {
                    options: {
                        sourceMap: 'public/concepts.min.map',
                        //below controls what is seen within matching js file
                        sourceMappingURL: function(path) { return path.replace("public/", "").replace(/.js/, '.map');  },
                        sourceMapRoot: '../', //helps with relative path
                        sourceMapPrefix: 1 //helps with relative path
                    },
                    files: {
                        'public/concepts.min.js': [
                            'concepts/concepts.js',
                            'concepts/**/*.js']
                    }
                }
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
                clientSideJS: {
                    files: ["concepts/**/*.js"],
                    tasks: ["jshint", "uglify"],
                    options: {
                        spawn: false
                    }
                }
            }
        });
    };

}());