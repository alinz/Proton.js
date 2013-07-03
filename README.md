Classy.js
==========

Description
----------------
Classy.js is a tiny framework for writing inheritance in JavaScript. It's currently less than 500 bytes. 437, to be exact, even without gzip.

Introduction & Motivation
-----------------
I created Classy.js after visiting **John Resig**'s popular [Simple JavaScript Inheritance](http://ejohn.org/blog/simple-javascript-inheritance/) post in his blog.
I sat down and tried to rewrite his implementation in my own version and design. I saw so many tutorials about how to do inheritance in javascript **BUT** one thing that bothered me a lot is using `new` during the inheritance implementation. 

For example:

```js
function Base(name) {
    this.name = name;
}
	
function Child() {
    Base.apply(this, arguments);
}
	
Child.prototype = new Base();
```

Frankly, it just feels **WRONG**. Why instantiate a new object just for my inheritance support? Or rather, I know the reason, but to me it's just a hack; I don't want a hack for a basic feature &mdash; and that is why Classy was created.

Highlights:

-> Extremely small and compact. can be copy/paste to any library.

-> Doesn't use `new` during of implementation of inheritance.

-> Supported by all browsers, old and new.

-> Simple syntax and interface, possibly customizable in terms of reserved key words.

-> Support for class methods

-> Uses prototype technique to reduces over-head of creating an object in JavaScript.

How to use it?
--------------------
Load the script however you like. For example:

```html
<script type="text/javascript" src="classy-x.y.z.js"></script>
```


Now you can create the JavaScript classes like this:

```js
var Base = Classy({
    initialize: function() {
        console.log('This is Base.');
    }
});

var Child = Base.extend({
    initialize: function() {
        Child.base(this);
        console.log('This is child');
    }
});

var obj = new Child();
```

Classy gets create a JavaScript object definition using prototype internally, ready for instantiation.

All the base class starts with Classy object itself. From that point, all the children use `extend` to extend the `Base` class.

Note: the extending class needs to pass `initialize` field, and the first line of the `initialize` function must call the `Base` constructor. 

```js
Child.base(this);
```

What about passing arguments to `Base` constructor? Take a look at the `base` class method:
    
    <Name of Drive Class>.base(<current object pointer>, <arg1>, <arg2>, ...);

Arguments to `initialize` can be passed along to the superclass. For example, if the `Base` constructor accepts 2 arguments, pass them to the subclass and then pass them along to the base class like so:
   
 ```js
initialize: function(arg1, arg2, arg3) {
    Child.base(this, arg2, arg3);
    this.value1 = arg1;
}
```

`Classy` also supports class methods which you can call directly without instantiation like static methods in JAVA as an example.

Here's an example of `singleton` implementation with Classy.js:

```js
var Base = Classy({
    initialize: function () {
	console.log('Base instantiated.');
    }
});
    
Classy(Base, {
    getInstance: (function () {
        var instance;
        return function () {
            if (!instance) {
                instance = new Base();
            }
            return instance;
        };
    }()
});

var base = Base.getInstance();
```
    
**NOTE:** I have added `test.html` which contains full example. 

Questions
--------------
if you have any questions, comments or etc. drop me a message at `a[dot]najafizadeh[at]gmail.com`.
