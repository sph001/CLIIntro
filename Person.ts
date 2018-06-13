export class Name {
    First:string;
    constructor(first:string) {
        this.First = first;
    }

    print():void {
        console.log(this.toString());
    }

    toString(): string { return this.First;}
}

export class FirstLastName extends Name {
    Last:String;
    constructor(first:string, last:string) {
        super(first);
        this.Last = last;
    }

    toString():string {
        return `${this.First} ${this.Last}`;
    }
}

export class FullName extends FirstLastName {
    Middle:string;
    constructor(first:string, middle:string, last:string) {
        super(first, last);
        this.Middle = middle;
    }

    toString():string {
        return `${this.First} ${this.Middle} ${this.Last}`;
    }
}

export class Person {
    Name:Name;
    Age:Number;
    Height:Number;
    constructor(name:Name, age:Number, height:Number) {
        this.Name = name;
        this.Age = age;
        this.Height = height;
    }

    introduce():void {
        console.log(`Hi. My name is ${this.Name.toString()}.`);
        console.log(`\tI am ${this.Age} years old,`);
        console.log(`\tand I am ${this.Height} CM tall.`);
    }
}