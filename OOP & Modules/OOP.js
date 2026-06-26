// What is OOP?

// Object-Oriented Programming is a programming paradigm where data and functionality are organized into objects.

// An object contains:

// Properties (Variables)
// Methods (Functions)

// Example:

// const student = {
//     name: "Rahul",
//     age: 20,

//     introduce() {
//         console.log(`Hi, I am ${this.name}`);
//     }
// };

// student.introduce();

// Output
// Hi, I am Rahul

// Creating Class & Objects

// class Student {

// }

// const s1 = new Student();
// const s2 = new Student();

// console.log(s1);
// console.log(s2);

// class Student {

//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     greet() {
//           console.log("Hello")
//     }

// }

// const s1 = new Student("Rahul", 20);
// const s2 = new Student("Aman", 22);
// const s3 = new Student;

// console.log(s1);
// console.log(s2);
// s3.greet()

// 'this' Keyword

// 'this' refers to the current object.

// class Car {
//   constructor(brand) {
//     this.brand = brand;
//   }

//   showBrand() {
//     let brand = "RR";
//     console.log(this.brand);
//   }
// }

// const car = new Car("BMW");

// car.showBrand();



// Inheritance

// Inheritance allows one class to use properties and methods of another class.

// Use the 'extends' keyword.

// class Animal {

//     eat() {
//         console.log("Animal is eating");
//     }

// }

// class Dog extends Animal {

//     bark() {
//         console.log("Dog is barking");
//     }

// }

// const dog = new Dog();

// dog.eat();

// dog.bark();




// super()

// super() calls the parent class constructor.




// class Person {

//     constructor(name) {
//         this.name = name;
//     }

// }

// class Student extends Person {

//     constructor(name, course) {
//         super()
//         this.name = name;
//         this.course = course;
//     }

// }

// const s = new Student("Rahul", "BCA");

// console.log(s);



// Method Overriding

// A child class can replace a parent method.


// class Animal {

//     sound() {
//         console.log("Animal sound");
//     }

// }

// class Dog extends Animal {

//     sound() {
//         console.log("Bark");
//     }

// }

// const dog = new Dog();

// dog.sound();





// Encapsulation

// Encapsulation hides data from outside the class.

// JavaScript supports private fields using #.


// class BankAccount {

//     #balance = 0;

//     deposit(amount) {
//         this.#balance += amount;
//     }

//     showBalance() {
//         console.log(#balance);
//     }

// }

// const account = new BankAccount();

// account.deposit(5000);

// account.showBalance();







// Getter & Setter


// class Student {

//     constructor(name) {
//         this._name = name;
//     }

//     get name() {
//         return this._name;
//     }

//     set name(value) {
//         this._name = value;
//     }

// }

// const s = new Student("Rahul");

// console.log(s.name);

// s.name = "Aman";

// console.log(s.name);










// Static Method

// Static methods belong to the class, not the object.


class MathUtil {

    static add(a, b) {
        return a + b;
    }

}

console.log(MathUtil.add(10, 20));
console.log(MathUtil.add(10, 20));
console.log(MathUtil.add(10, 20));


