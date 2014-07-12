(function() {
     "use strict";

     describe("Mixins Tests", function() {

        it("should be able to add mixins successfully", function() {

            var Foo = CPTS.mixins.Foo,
                bar = CPTS.mixins.bar,
                fooIns = new Foo(),
                fooBar;

            //validate foo
            expect(_.isFunction(fooIns.sayAnything)).toBeTruthy();
            expect(fooIns.walkTheDog).toBeUndefined();

            //vaslidate bar
            expect(_.isFunction(bar.walkTheDog)).toBeTruthy();
            expect(bar.sayAnything).toBeUndefined();

            //validate mixin operation
            fooBar = _.extend(fooIns, bar);
            expect(_.isFunction(fooBar.sayAnything)).toBeTruthy();
            expect(_.isFunction(fooBar.walkTheDog)).toBeTruthy();
        });

     });

}());