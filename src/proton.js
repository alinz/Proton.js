/** @preserve Proton.js: Tiny framework for writing inheritance in javascript
 * version: 0.2.1
 * By Ali Najafizadeh, http://morezilla.net
 * MIT Licensed.
 */
(function () {
    'use strict';

    //this is the constructor name.
    //you can change this if you want to.
    var init = 'initialize',
        Proton,
        AOP;

    /**
     * toClass
     * this function extracts initialize property and make it as a
     * function and attaches the rest of the properties as a prototype.
     * @param impl {Object}
     * @return {Function}
     */
    function toClass(impl) {
        var prop,
            clazz = impl[init] || function () {};
        for (prop in impl)
            if (impl.hasOwnProperty(prop) && prop !== init)
                    clazz.prototype[prop] = impl[prop];
        return clazz;
    }

    /**
     * extending
     * this function overrides the implementation of base methods with
     * child methods. also ignores initialize, constructor, to be added
     * @param childImpl
     * @param baseImpl
     */
    function extending(childImpl, baseImpl) {
        var prop;
        for (prop in baseImpl)
            if (!childImpl.hasOwnProperty(prop) && prop !== init)
                childImpl[prop] = baseImpl[prop];
    }

    /**
     * Proton
     * this is a global function which has 2 signatures.
     * the first signature is when you want to make a class.
     * var Person = Proton({
     *      initialize: function (name) {
     *          this.name = name;
     *      },
     *      getName: function () {
     *          return this.name;
     *      }
     * });
     *
     * var person = new Person('John');
     * console.log(person.getName());
     *
     *
     * the second signature is when you want to add classMethod to Class definition.
     * the following code does not return anything since you are attaching class Methods
     * to Class definition.
     * for example,
     * Proton(Person, {
     *      create: function () {
     *          return new Person('no-one');
     *      }
     * });
     *
     * var defaultPerson = Person.create();
     *
     * @param impl
     * @param classMethods
     * @returns {Function | undefined}
     */
    Proton = function (impl, classMethods) {
        if (classMethods) {
            extending(impl, classMethods);
            return;
        }
        var base = toClass(impl);
        /**
         * extend
         * this class method helps extending a class easier.
         * @param childImpl
         * @return {Function}
         */
        base.extend = function (childImpl) {
            var child;
            extending(childImpl, impl);
            child = Proton(childImpl);

            //this class method is designed to call the Base constructor
            //this method has be called inside initialize method of child class.
            //it must be the first line.
            child.base = function () {
                var args = Array.prototype.slice.call(arguments),
                    childObject = args.shift();
                base.apply(childObject, args);
            };

            //Keep tracking of parent implementation of method.
            //it is useful if you need the implementation of parent class rather than
            //the class itself.
            child.parent = base;

            return child;
        };
        return base;
    };

    //adding Aspect Oriented Paradigm
    AOP = Proton({
        initialize: function (klass, method) {
            this._method = method;
            this._klass = klass.prototype;
        },
        before: function (action) {
            var method = this._klass[this._method];

            this._klass[this._method] = function () {
                action.apply(this, arguments);
                return method.apply(this, arguments);
            };

            return this;
        },
        afterReturning: function (action) {
            var method = this._klass[this._method];

            this._klass[this._method] = function () {
                var result =  method.apply(this, arguments);
                return action.call(this, result);
            };

            return this;
        },
        afterThrowing: function (action) {
            var method = this._klass[this._method];

            this._klass[this._method] = function () {
                var result;
                try {
                    result = method.apply(this, arguments);
                } catch(e) {
                    result = action.call(this, e);
                }
                return result;
            };

            return this;
        }
    });

    /**
     * Aspect Oriented Paradigm
     *
     * if you want to use AOP, what you have to do is passing your class object and method that you want to
     * modify and keep chaining the the methods.
     *
     * At this moment, three methods have been implemented, before,
     *                                                      afterReturning,m afterThrowing.
     *
     * @param klass  {Proton class object}
     * @param method {string}
     * @returns {AOP}
     */
    Proton.AOP = function (klass, method) {
        return new AOP(klass, method);
    };

    //Export the The library for Node.js and Browser.
    //for using in node, please use the following code
    // var Proton = require('./classy-x.y.z.min.js');
    if ('undefined' !== typeof module) {
        module.exports = Proton;
    } else {
        window.Proton = Proton;
    }

}());