/**
 * This will house all common modules specific to the acme application:  acmeService, acmeDirective, acmeModel, etc.
 *  - the idea is to keep these objects testable without having to inject acmeApp itself -- too large
 */
(function(angular) {
    "use strict";

    angular.module("acmeModule", ["acmeProvider", "acmeDirective", "acmeService", "acmeModel"]);

}(angular));