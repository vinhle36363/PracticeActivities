// JavaScript ES6 Class
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

// JavaScript Prototype
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

