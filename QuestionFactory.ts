import * as Readline from "readline";

export type Action<T> = (input:string) => T | undefined;

export class Question<T> {
    public Text:string;
    public Action:Action<T>;
    public Result?:T;

    constructor(text:string, action:Action<T>) {
        this.Text = text;
        this.Action = action;
    }

    public async ask(rl:Readline.ReadLine):Promise<{}> {
        return new Promise((resolve, reject)=> {
            rl.question(this.Text+"\n", (answer:string)=> {
                this.Result = this.Action(answer);
                if (this.Result === undefined) { reject("invalid response");}
                resolve();
            });
        });
    }
}

export abstract class QuestionFactory<T> {
    public Results:T[] = [];
    protected Questions:Question<any>[] = [];
    private rl:Readline.ReadLine;
    private end:Question<Number>;
    private shouldStop:boolean = false;

    abstract setupQuestions():void;
    abstract buildValue():T;

    constructor() {
        this.rl = Readline.createInterface({input: process.stdin, output: process.stdout});
        this.end = new Question("completed! should we add another?", (answer)=> {
            if (answer.toLowerCase().startsWith("n")) {
                this.shouldStop = true;
            }
            return 1;
        });
        this.setupQuestions();
    }

    public async ask():Promise<void> {
        if (this.shouldStop) {
            this.rl = Readline.createInterface({input: process.stdin, output: process.stdout});
            this.shouldStop = false;
        }
        while (!this.shouldStop) {
            await this.askQuestions();
        }
        this.rl.close();
    }

    private async askQuestions():Promise<void> {
        await this.asyncForEach(this.Questions, async (question:Question<any>)=> {
            await question.ask(this.rl);
        });
        this.Results.push(this.buildValue());
        await this.end.ask(this.rl);
    }

    private async asyncForEach(array:any[], callback:any):Promise<void> {
        for (let i:number = 0; i < array.length; i++) {
            await callback(array[i], i, array);
        }
    }
}
