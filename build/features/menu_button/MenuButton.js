import { Button } from "../../shared/components/button/Button.js";
export class MenuButton extends Button {
    constructor(label) {
        super(label);
        this.classList.add("menu-button");
    }
}
customElements.define("menu-button-el", MenuButton);
//# sourceMappingURL=MenuButton.js.map