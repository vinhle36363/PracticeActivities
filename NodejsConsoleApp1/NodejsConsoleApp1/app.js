// **********JavaScript ES6 Class**************
// Definition:
//  - Special function, contain 2 components: class expression and declerations.
class Car
{
    // Class's constructor
    constructor(color, brand)
    {
        this.color = color;
        this.brand = brand;
    }

    // Car details function, return a sentence of a given class value.
    carDetails()
    {
        return this.color + ' ' + this.brand + ' car.';
    }
}

// **********JavaScript Prototype************
// We will creating 2 obj of class car and pass in different attributes and execute carDetails()
// Expected result: different object return diffrent results: car1 will return Black Mustang car.
//                                                            car2 will return White Mercedes car.
var car1 = new Car('Black', 'Mustang');
var car2 = new Car('White', 'Mercedes');

console.log(car1.carDetails()); // result: Black Mustang car.
console.log(car2.carDetails()); // result: White Mercedes car.

// New way to create a class as a function
function Animal(name, color)
{
    this.name = name;
    this.color = color;
}

// Using prototype here
Animal.prototype.getDetails = function () // or Animal.prototype.getDetails() { Definition goes here }
{
    return this.color + ' ' + this.name;
}

var dog = Animal('Dog', 'White');
var cat = Animal('Cat', 'Black');

console.log(dog.getDetails()); // result: White Dog
console.log(cat.getDetails()); // result: Black Cat

// ************ES6 IIFE (Immediately Invoked Function Expression)******************
// Run ASA it defined
// Obtaining data privacy because any variables declared within the IIFE CANNOT be accessed by the outside world
(function () {
    var greeting = "hello";
    console.log(greeting); // print out "hello" on the console
})
    ();
// if we try console.log(greeting) here the error will be: greeting is not defined

// *******JavaScript Closures***********
//  - Combinaiton of a function and lexial environment within that function was declared
//  - Easier words: function that has access to the outter(enclosing) function variables
//  - Closures has 3 scope chain: access to it own scope(variables defined between its curly brackets),
//                                       to the outer function's variable,
//                                       to the global variables
function Greeting(name)
{
    var displayGreeting = function (greeting)
    {
        console.log(greeting + ' ' + name);
    }
    return displayGreeting;
}

var sayHi = Greeting('Vinh'); // Passing value to variable name of class Greeting.

// Passing value to variable greeting of function displayGreeting.
// The displayGreeting function wil have access to the variables in the Greeting function scope even after the
// Greeting function has executed
sayHi('Hi '); // result: Hi Vinh

// ***********Module Pattern************
// "Module" - independent small units ~ also reusable code
// Export as value (rather than define a type) - export an object
// Can be exported and imported to another JS files using:
//  1. export default myModule;
//  2. import myModule from 'link.to.file.location/myModule';
// Benefits: Maintainability, Reusability, Namespacing
var myModule = (function () // Using Closures
{
    // Literal expression is to indicate that the code should be executed in "strict mode". 
    // With strict mode, you can not, for example, use undeclared variables.
    'use strict';

    // No access from outside world
    var _privateProperty = 'Vinh information';
    function _privateMethod() {
        console.log(_privateProperty);
    }

    // Safe-to-Share data goes inside return function
    return {
        // Accessable from outside
        publicMethod: function () {
            _privateMethod();
        }
    };
}());

myModule.publicMethod();                        // normal output: "Vinh information"
console.log(myModule._privateProperty);         // undefined because we're using Closures
myModule._privateMethod();                      // TypeError this function is protected by the Closures

