"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PersonFactory_1 = require("./PersonFactory");
async function Main() {
    let factory = new PersonFactory_1.PersonFactory();
    await factory.ask();
    factory.introduceAll();
}
Main();
