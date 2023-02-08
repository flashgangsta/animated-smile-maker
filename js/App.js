import {Interface} from "./app/interface/Interface.js";
import {FileManager} from "./app/utils/FileManager.js";

export class App {
	constructor() {
		document.body.append(new Interface());
	}
}

new App();