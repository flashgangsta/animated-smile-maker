import {Interface} from "./app/interface/Interface.js";

export class App {
	constructor() {
		document.body.append(new Interface());
	}
}

new App();