import * as Person from "./Person";
import {PersonFactory} from "./PersonFactory";

async function Main():Promise<void> {
    let factory:PersonFactory = new PersonFactory();
    await factory.ask();
    factory.introduceAll();
}

Main();