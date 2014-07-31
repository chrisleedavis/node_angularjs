/*
    Highly influenced by the following directive on github: https://gist.github.com/tleunen/5277011

    What's different?  Instead of using gists, gist-it is used so actual files from github can be referenced

    *** $document cannot be used here ***

 */
(function(angular) {
    "use strict";
    
    angular.module("acmeDirective")
        .directive("acmeGistIt", [function () {
            return function(scope, elm, attrs) {

                        var fileName = attrs.acmeGistIt,
                            iFrame = document.createElement("iFrame"),
                            iFrameHtml,
                            doc;

                        iFrame.setAttribute("width", "100%");
                        iFrame.setAttribute("frameborder", "0");
                        iFrame.id = "gist-it-" + fileName;
                        elm[0].appendChild(iFrame);
             
                        iFrameHtml = '<html><head><base target="_parent"><style>table{font-size:12px;}</style></head><body onload="parent.document.getElementById(\'' + iFrame.id + '\').style.height=document.body.scrollHeight + \'px\'"><scr' + 'ipt type="text/javascript" src="http://gist-it.appspot.com/http://github.com/chrisleedavis/node_angularjs/blob/master/acme/application/concepts/' + fileName + '.js"></sc'+'ript></body></html>';
                        doc = iFrame.document;

                        if (iFrame.contentDocument) {
                         doc = iFrame.contentDocument;
                        }
                        else if (iFrame.contentWindow) {
                         doc = iFrame.contentWindow.document;
                        }
             
                        doc.open();
                        doc.writeln(iFrameHtml);
                        doc.close();
                    };
        }]);

}(angular));