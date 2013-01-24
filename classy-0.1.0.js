/* Classy.js: Tiny framework for writing inheritance in javascript
 * version: 0.1.0
 * By Ali Najafizadeh, http://morezilla.net
 * MIT Licensed.
 */
(function (window) {
	'use strict';
	
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
	 * child methods.
	 * @param childImpl
	 * @param baseImpl
	 */
	function extending(childImpl, baseImpl) {
		var prop;
		for (prop in baseImpl)
			if (!childImpl.hasOwnProperty(prop) && prop !== init)
				childImpl[prop] = baseImpl[prop];
	}

	window.Classy = function (impl) {
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
	}
}(window));