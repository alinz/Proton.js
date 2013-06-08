Classy.js
==========

Description
----------------
Tiny framework for writing inheritance in JavaScript. Less than 500 bytes, to be exact 437 bytes even without using gzip.

Introduction & Motovation
-----------------
Classy.js is a challenge project for me after visiting **John Resig**'s popular **Simple JavaScript Inheritance** post in his blog.
I sat down and tried to rewrite his implementation in my own version and design. I saw so many tutorials about how to do inheritance in javascript **BUT** one thing bothers me a lot and that one is `new` command during implementing inheritance. 

for example:

    function Base(name) {
    	this.name = name;
	}
	
	function Child() {
    	Base.apply(this, arguments);
	}
	
	Child.prototype = new Base();

Frankly speaking, it feels **WRONG** in so many ways. Why on earth I need to instanciate an object for my class to be extended, I know the reason, but to me this is a hack. So I don't want a hack for a basic feature. and that is why Classy was created.

Couple of highlights:

-> Extremely small and compact. can be copy/paste to any library.

-> Doesn't use `new` during of implementation of inheritance.

-> Supports by all browsers, old and new.

-> Simple syntax and interface, possibly customizable in terms of reserved key words.

-> Supports adding class methods as well  

How to use it?
--------------------
load the script in whatever you like, for example by using

    <script type="text/javascript" src="classy-x.y.z.js"></script>


Now you can create the JavaScript classes in an easier way.
For example:

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

The concept is easy, Classy gets an JavaScript object and convert it into proper class definition using prototype feature.

So all the base class starts with Classy object itself. From that point, all the children are using `extend` to extend the `Base` class.
One thing to remember is the first line of your constructor which is `initialize` has to be calling the `Base` constructor. for example
    
    Child.base(this);

What about passing arguments to `Base` constructor? In order to answer this question let's take a look at the `base` class method. `base` class method is define as follow:
    
    <Name of Drive Class>.base(<current object pointer>, <arg1>, <arg2>, ...);

Let's make a real example. Let's just assume that `Base` constructor accepts 2 arguments. In order to pass the arguments to constructor, we will use it like the following:
    
    initialize: function(arg1, arg2, arg3) {
        Child.base(this, arg2, arg3);
        this.value1 = arg1;
    }

`Classy` also supports adding class methods which you can call them without creating an object from that class. Similar to Static methods in JAVA as an example.

Here's an example:

    var Base = Classy({
    	initialize: function () {
        	console.log('Base instantiated.');
        }
    });
    
    Classy(Base, {
    	getNewInstance: function () {
    		return new Base();
    	}
    });
    
    var base = Base.getNewInstance();
    
**NOTE:** I have added `test.html` which contains full example. 

Questions
--------------
if you have any questions, comments or etc. drop me a message at `a[dot]najafizadeh[at]gmail.com`.
