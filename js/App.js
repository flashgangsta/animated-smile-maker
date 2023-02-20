import {Interface} from "./app/interface/Interface.js";

export class App {
	constructor() {
		const appInterface = new Interface();
		document.body.append(appInterface);
		appInterface.dispatchEvent(new Event("ADDED_TO_DOM"));
	}
}

window.addEventListener("load", (event) => {
	new App();
});