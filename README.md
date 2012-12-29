Classy.js
==========

Description
----------------
Tiny framework for writing inheritance in JavaScript. Less than 500 bytes.

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
            Child.parent(this);
            console.log('This is child');
        }
    });

    var obj = new Child();

The concept is easy, Classy gets an JavaScript object and convert it into proper class definition using prototype feature.

So all the base class starts with Classy object itself. From that point, all the children are using `extend` to extend the `Base` class.
One thing to remember is the first line of your constructor which is `initialize` has to be calling the `Base` constructor. for example
    
    Child.parent(this);

What about passing arguments to `Base` constructor? In order to answer this question let's take a look at the `parent` class method. `parent` class method is define as follow:
    
    <Name of Drive Class>.parent(<current object pointer>, <arg1>, <arg2>, ...);

Let's make a real example. Let's just assume that `Base` constructor accepts 2 arguments. In order to pass the arguments to constructor, we will use it like the following:
    
    initialize: function(arg1, arg2, arg3) {
        Child.parent(this, arg2, arg3);
        this.value1 = arg1;
    }


Questions
--------------
if you have any questions, comments or etc. drop me a message at `a[dot]najafizadeh[at]gmail.com`.