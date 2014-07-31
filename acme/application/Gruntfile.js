(function() {
    "use strict";

    var jsHintFiles = [
            "app.js", 
            "errorModel.js", 
            "productController.js", 
            "productModel.js",
            "concepts/**/*.js",
            "app/**/*.js",
            "test/**/*.js"
        ],

        karmaFiles = [
            "lib/angular.js",
            "lib/angular-mocks.js",
            "lib/angular-cookies.js",
            "lib/angular-resource.js",
            "lib/angular-sanitize.js",
            "lib/angular-ui-router.js",
            "lib/angular-ui-utils.js",
            "lib/browserTrigger.js",
            "lib/lodash.js",
            "lib/ui-bootstrap-tpls.js",
            "concepts/concepts.js",
            "concepts/**/*.js",
            "test/concepts/**/*.js"
        ];

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
                tasks: ["nodemon", "uglify", "cssmin", "ngtemplates", "karma", "watch"],
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
                src: [
                    "test/productControllerSpec.js", 
                    "test/productModelSpec.js"
                ]
              }
            },

            karma: {
                unit: {
                    reporters: "dots",
                    configFile: "karma.conf.js",
                    browsers: ["PhantomJS"],
                    autoWatch: true,
                    options: {
                        files: karmaFiles //todo: file list based on build context
                    }
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
                        "CPTS": true,
                        "describe": true,
                        "it": true,
                        "beforeEach": true,
                        "expect": true,
                        "spyOn": true
                    },
                    "strict": true, //use strict mode at function level
                    "undef": true, //make sure global variables are checked, excluded above globals filter,
                    "eqeqeq": true,  //make sure to enforce coercion within JS,
                    force: true    //don"t fail task if error reported
                },
                js: jsHintFiles
            },

            uglify: {
                options: {
                    mangle: false,
                    beautify : 
                    {
                        ascii_only : true  //will help with angular & unicode characters (localization: posPre, negPre (\u00a4))
                    }
                },

                app: {
                    options: {
                        sourceMap: "public/acme.min.map",
                        //below controls what is seen within matching js file
                        sourceMappingURL: function(path) { return path.replace("public/", "").replace(/.js/, ".map");  },
                        sourceMapRoot: "../", //helps with relative path
                        sourceMapPrefix: 1 //helps with relative path
                    },
                    files: {
                        "public/acme.min.js": [
                            "app/app.js",
                            "public/acme.templates.js",
                            "app/**/*.js"]
                    }
                },

                concepts: {
                    options: {
                        sourceMap: "public/concepts.min.map",
                        //below controls what is seen within matching js file
                        sourceMappingURL: function(path) { return path.replace("public/", "").replace(/.js/, ".map");  },
                        sourceMapRoot: "../", //helps with relative path
                        sourceMapPrefix: 1 //helps with relative path
                    },
                    files: {
                        "public/concepts.min.js": [
                            "concepts/concepts.js",
                            "concepts/**/*.js"]
                    }
                },

                lib: {
                    options: {
                        sourceMap: "public/lib.min.map",
                        //below controls what is seen within matching js file
                        sourceMappingURL: function(path) { return path.replace("public/", "").replace(/.js/, ".map");  },
                        sourceMapRoot: "../", //helps with relative path
                        sourceMapPrefix: 1 //helps with relative path
                    },
                    files: {
                        "public/lib.min.js": [
                            "lib/angular.js",
                            "lib/**/*.js",
                            "!lib/angular-mocks.js", //for testing only
                            "!lib/browserTrigger.js", //for testing only
                            "!lib/localization/**/*.js", //only load en_US
                            "lib/localization/angular-locale_en_US.js"]
                    }
                },
            },

            cssmin: {
                combine: {
                    files: {
                        "public/css/theme.min.css": [
                            "content/css/bootstrap.css",
                            "content/css/bootstrap-theme.css",
                            "content/css/acme.css"
                        ]
                    }
                }
            },

            ngtemplates: {

               all: {
                    options:      {
                        url:    function(url) { return url.replace("app/", "/templates/acme/"); },
                        module:     "acmeTemplates",
						standalone: true
                    },
                    src: "app/**/**.html",
                    dest: "public/acme.templates.js"
               }
            },

            //to run, call `grunt karma:unit watch in console
            watch: {
                options: {
                    atBegin: true
                },
                mochaTest: {
                    files: [
                        "app.js", 
                        "errorModel.js", 
                        "productController.js", 
                        "productModel.js",
                        "test/productControllerSpec.js", 
                        "test/productModelSpec.js"
                    ],
                    tasks: ["jshint", "mochaTest"],
                    options: {
                      spawn: false
                    }
                },
                js: {
                    files: jsHintFiles.concat(["app/**/*.html"]),
                    tasks: ["jshint", "uglify", "ngtemplates"],
                    options: {
                        spawn: false
                    }
                },
                css: {
                    files: ["content/css/**/*.css"],
                    tasks: ["cssmin"],
                    options: {
                        spawn: false
                    }
                }
            }
        });
    };

}());