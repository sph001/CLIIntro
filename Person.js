"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Name {
    constructor(first) {
        this.First = first;
    }
    print() {
        console.log(this.toString());
    }
    toString() { return this.First; }
    ;
}
exports.Name = Name;
class FirstLastName extends Name {
    constructor(first, last) {
        super(first);
        this.Last = last;
    }
    toString() { return `${this.First} ${this.Last}`; }
    ;
}
exports.FirstLastName = FirstLastName;
class FullName extends FirstLastName {
    constructor(first, middle, last) {
        super(first, last);
        this.Middle = middle;
    }
    toString() {
        return `${this.First} ${this.Middle} ${this.Last}`;
    }
}
exports.FullName = FullName;
class Person {
    constructor(name, age, height) {
        this.Name = name;
        this.Age = age;
        this.Height = height;
    }
    introduce() {
        console.log(`Hi. My name is ${this.Name.toString()}.`);
        console.log(`    I am ${this.Age} years old,`);
        console.log(`    and I am ${this.Height} CM tall.`);
    }
}
exports.Person = Person;
