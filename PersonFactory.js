"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Person_1 = require("./Person");
const QuestionFactory_1 = require("./QuestionFactory");
class PersonFactory extends QuestionFactory_1.QuestionFactory {
    setupQuestions() {
        this.Questions.push(new QuestionFactory_1.Question("what is your name?", (answer) => {
            let split = answer.split(" ");
            if (split.length === 1)
                return new Person_1.Name(split[0]);
            else if (split.length === 2)
                return new Person_1.FirstLastName(split[0], split[1]);
            else if (split.length === 3)
                return new Person_1.FullName(split[0], split[1], split[2]);
            else
                return undefined;
        }), new QuestionFactory_1.Question("what is your age?", (answer) => { return parseInt(answer, 10); }), new QuestionFactory_1.Question("what is your height in CM?", (answer) => { return parseInt(answer, 10); }));
    }
    buildValue() {
        return new Person_1.Person(this.Questions[0].Result, this.Questions[1].Result, this.Questions[2].Result);
    }
    introduceAll() {
        this.Results.forEach(person => {
            person.introduce();
        });
    }
}
exports.PersonFactory = PersonFactory;
