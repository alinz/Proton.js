/* Classy.js: Tiny framework for writing inheritance in javascript
 * version: 0.1.0
 * By Ali Najafizadeh, http://morezilla.net
 * MIT Licensed.
 */
(function (window) {
	'use strict';

    //this is the constructor name.
    //you can change this if you want to.
	var init = 'initialize';

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
     * Classy
     * this is a global function which has 2 signatures.
     * the first signature is when you want to make a class.
     * var Person = Classy({
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
     * Classy(Person, {
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
	window.Classy = function (impl, classMethods) {
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
			child = Classy(childImpl);

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
}(window));