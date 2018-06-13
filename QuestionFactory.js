"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const Readline = __importStar(require("readline"));
class Question {
    constructor(text, action) {
        this.Text = text;
        this.Action = action;
    }
    async ask(rl) {
        return new Promise((resolve, reject) => {
            rl.question(this.Text + "\n", (answer) => {
                this.Result = this.Action(answer);
                if (this.Result == null)
                    reject("invalid response");
                resolve();
            });
        });
    }
}
exports.Question = Question;
class QuestionFactory {
    constructor() {
        this.Results = [];
        this.Questions = [];
        this.shouldStop = false;
        this.rl = Readline.createInterface({ input: process.stdin, output: process.stdout });
        this.end = new Question("completed! should we add another?", (answer) => {
            if (answer.toLowerCase().startsWith("n"))
                this.shouldStop = true;
            return 1;
        });
        this.setupQuestions();
    }
    async ask() {
        if (this.shouldStop) {
            this.rl = Readline.createInterface({ input: process.stdin, output: process.stdout });
            this.shouldStop = false;
        }
        while (!this.shouldStop) {
            await this.askQuestions();
        }
        this.rl.close();
    }
    async askQuestions() {
        await this.asyncForEach(this.Questions, async (question) => {
            await question.ask(this.rl);
        });
        this.Results.push(this.buildValue());
        await this.end.ask(this.rl);
    }
    async asyncForEach(array, callback) {
        for (let i = 0; i < array.length; i++) {
            await callback(array[i], i, array);
        }
    }
}
exports.QuestionFactory = QuestionFactory;
