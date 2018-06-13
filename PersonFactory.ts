import {Person, Name, FirstLastName, FullName} from "./Person";
import { QuestionFactory, Question, Action } from "./QuestionFactory";

export class PersonFactory extends QuestionFactory<Person> {

    setupQuestions():void {
        this.Questions.push(
            new Question<Name | undefined>("what is your name?", (answer:string)=> {
                let split:string[] = answer.split(" ");
                if (split.length === 1) {
                    return new Name(split[0]);
                } else if (split.length === 2) {
                    return new FirstLastName(split[0], split[1]);
                } else if (split.length === 3) {
                    return new FullName(split[0], split[1], split[2]);
                }
                return undefined;
            }),
            new Question<Number>("what is your age?", (answer:string) => {return parseInt(answer, 10);}),
            new Question<Number>("what is your height in CM?", (answer:string) => {return parseInt(answer, 10);})
        );
    }

    buildValue():Person {
        return new Person(this.Questions[0].Result, this.Questions[1].Result, this.Questions[2].Result);
    }

    introduceAll():void {
        this.Results.forEach(person => {
            person.introduce();
        });
    }
}