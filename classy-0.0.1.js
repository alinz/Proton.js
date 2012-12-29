/* Classy.js: Tiny framework for writing inheritance in javascript
 * version: 0.0.1
 * By Ali Najafizadeh, http://morezilla.net
 * MIT Licensed.
 */
var Classy = (function () {
    'use strict';
    var init = 'initialize';

    function extending(child, base) {
        function Dummy() {
            this.constructor = child;
        }
        Dummy.prototype = base.prototype;
        child.prototype = new Dummy();
    }

    function convert(impl) {
        var prop,
            dummy = impl[init] || function () {};
        for (prop in impl) {
            if (impl.hasOwnProperty(prop)) {
                if (prop !== init) {
                    dummy.prototype[prop] = impl[prop];
                }
            }
        }
        return dummy;
    }

    return function (impl) {
        var base = convert(impl);

        base.extend = function (childImpl) {
            var child = new Classy(childImpl);
            extending(child, base);

            child.parent = function () {
                var args = Array.prototype.slice.call(arguments),
                    that = args.shift();
                base.apply(that, args);
            };
            return child;
        };

        return base;
    };
}());