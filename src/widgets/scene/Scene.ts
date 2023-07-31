import {ElementBase} from "../../shared/ElementBase.js";

export class Scene extends ElementBase {
    constructor() {
        super();
        this.id = "scene";
    }
}

customElements.define("el-scene", Scene);