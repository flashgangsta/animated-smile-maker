import { PanelButton } from "../panel_button/PanelButton.js";
export class ToolButton extends PanelButton {
    constructor(iconPath, toolName) {
        super(iconPath);
        this.toolNameValue = toolName;
    }
    get toolName() {
        return this.toolNameValue;
    }
}
customElements.define("el-tool-button", ToolButton);
//# sourceMappingURL=ToolButton.js.map