import {PanelButton} from "../panel_button/PanelButton.js";

export class ToolButton extends PanelButton {
    private toolNameValue:string;
    constructor(iconPath:string, toolName:string) {
        super(iconPath);
        this.toolNameValue = toolName;
    }

    get toolName():string {
        return this.toolNameValue;
    }
}

customElements.define("el-tool-button", ToolButton);