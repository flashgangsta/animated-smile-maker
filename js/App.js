import {Interface} from "./app/interface/Interface.js";

export class App {
	constructor() {
		console.log("Hi");
		document.body.append(new Interface());
	}
}

new App();