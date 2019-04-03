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

// **********Hoisting************
// A JS mechanism where variables and function declarations are moved to the top of their scope before any execution.
// JavaScript only hoists declarations, not initialisation. 
// No matter where functions and variables are declared, they are moved to the top of their scope regardless of whether their scope is global or local.
console.log(hoist); // Output: undefined
var hoist = 'The variable has been hoisted.';

// We expected the result of the log to be: ReferenceError: hoist is not defined, but instead, its output is undefined.
// What actually the code does:
var hoist;
console.log(hoist); // Output: undefined
hoist = 'The variable has been hoisted.';
// Because of this, we can use variables before we declare them. However, we have to be careful because the hoisted variable is initialised with a value of undefined. 
// The best option would be to declare and initialise our variable before use.

// ************SCOPE***************
// Global vs Local
// Describing the accessibility of variables, functions, and objects during runtime of a particular part of your code.

// Global scope
var myName = "Vinh on global";
(function () {
    console.log(myName); // output: Vinh on global
})();

// Local scope
(function () {
    var myOtherName = 'Tin on local';
    console.log(myOtherName); // output: Tin on local 
})();

console.log(myOtherName); // output: Reference-Error myOtherName is not defined

// Affected by ES6 with let and const type variables (in used of replacing var)
if (true)
{
    // var - global scope
    var nationality = 'Vietnam';
    // let - local scope, value can be changed during execution
    let age = '22';
    // const - local scope, value can't be changed during execution
    const name = 'Vinh';
}

// Variable age and name will be dead after the if statement code executed, however the nationality still exist as long as your application live.
// age and name only live as long as the function are called and executed.
console.log(nationality); // output: Vietnam
console.log(age);   // output: Uncaught ReferenceError: age is not defined 
console.log(name);  // output: Uncaught ReferenceError: name is not defined 

// ************Currying************
// Is a technique of evaluating function with multiple arguments into sequence of function with single argument.
// This helps to create a higher order function, extremly helpful in event handling 
var studentEvaluation = function (name)
{
    return function (program)
    {
        return function (grade)
        {
            if (grade >= 50) {
                return name + ' of ' + program + ' pass the course with the grade of ' + grade;
            } else {
                return name + ' of ' + program + ' fail the course with the grade of ' + grade;
            }
        }
    }
}

console.log(studentEvaluation('Vinh')('CST')(80)); // output: Vinh of CST pass the course with the grade of 80
console.log(studentEvaluation('John')('CST')(30)); // output: John of CST fail the course with the grade of 30

// ***********Memoization*************
// Programming technique which attemp to boost function's performance by caching its previously computed results.
// Each time momoization function is called, its parameters are used to index the cache.
// **Important**: If the data is present, then it can be returned, without executing the entire function. 
//              However, if the data is not cached, then the function is executed, and the result is added to the cache.
// Help to modularity and reusable of the code
const memoizedAdd = () => {
    // Creating cache array
    let cache = {};
    return (value) => {
        // Checking whether the value is in the cache or not
        // If there is, return the number inside cache at index value
        if (value in cache) {
            console.log('Fetching from cache');
            return cache[value];
        }
        // Calculating the result and put it into cache at index value if there was nothing inside cache
        else {
            console.log('Calculating result');
            let result = value + 10;
            cache[value] = result;
            return result;
        }
    }
}
// returned function from memoizedAdd
const newAdd = memoizedAdd();
console.log(newAdd(10)); //output: Calculating result /n 20
console.log(newAdd(10)); //output: Fetching from cache /n 20

// ************Callback function******************
// Functions being call inside another function as arguments to complete a routine or action
// This function wil says thank to customer
function sayThanks(name) {
    console.log('Thank you ' + name);
}

// This function will check whether customer has paid enough money or not
function isMoneyEnough(amount) {
    if (amount > 0) {
        return false;
    } else {
        return true;
    }
}

// This function will call the above 2 function in order to complete an action
function sell(money, price, name) {
    let amount = 0;
    amount = price - money;
    // Checking the price and money
    let enough = isMoneyEnough(amount);
    // If not enough, ask customer to pay more
    if (!enough) {
        let moneyMissing = price - money;
        console.log('Sorry ' + name + ', you still need to pay $' + moneyMissing + ' more to buy this stuff.');
    } else {
        if (price === money) {      // If payment is enough say thanks
            console.log('You has paid enough money.');
            sayThanks(name);
        } else {                    // If payment is more than enough, give back change and say thanks
            let change = money - price;
            console.log('Here is your change $' + change + '.');
            sayThanks(name);
        }
    }
}

console.log(sell(12, 12, 'Tin')); // output: You has paid enough money. Thank you Tin
console.log(sell(9, 8, 'Vinh')); // output: Here is your change $1. Thank you Vinh
console.log(sell(7, 10, 'Jake')); // output: Sorry Jake, you still need to pay $3 more to buy this stuff.

// *******************Apply/Call/Bind methods******************
// Common methods of many classes 
var student1 = {
    additionalSubject = "France";
}

var student2 = {
    additionalSubject = "Vietnamese";
}

function totalSubject(subj2, subj3, subj4)
{
    return 'Total subjects: ' + subj2 + ', ' + subj3 + ', ' + subj4 + ', ' + this.additionalSubject; 
}

var arr = ['Math', 'Physics', 'Chemistry'];

// Call method
// Using call method we can bound student1 or student2 to totalSubject function with the property additionalSubject
console.log(totalSubject.call(student1, 'Math', 'Physics', 'Chemistry')); // output: Total subjects: Math, Physics, Chemistry, France
console.log(totalSubject.call(student2, 'Math', 'Physics', 'Chemistry')); // output: Total subjects: Math, Physics, Chemistry, Vietnamese

// Apply method
// Using apply method we also can pass an array as an argument
console.log(totalSubject.apply(student1, arr)); // output: Total subjects: Math, Physics, Chemistry, France
console.log(totalSubject.apply(student2, arr)); // output: Total subjects: Math, Physics, Chemistry, Vietnamese

// Bind method
// Bind method return method instance instead of result value
var bound = totalSubject.bind(student1);
console.log(bound('Math', 'Physics', 'Chemistry')); // output: Total subjects: Math, Physics, Chemistry, France
var bound = totalSubject.bind(student2);
console.log(bound('Math', 'Physics', 'Chemistry')); // output: Total subjects: Math, Physics, Chemistry, Vietnamese

// ************************Polymorphism******************************
// OOP (Object Oriented Programming)
// Taking advantages of inheritance by overriding shared object behaviours
var student = new Student('Vinh');

// override function
// this method will be executed
Student.prototype.getName() {
    return this.name.toUpperCase();
}

console.log(student.getName()); // output: VINH instead of Vinh

// Class Student
class Student
{
    constructor(name)
    {
        this.name = name;
    }

    getName()
    {
        return this.name;
    }
}

